import { useReducer, useEffect, useRef, useState, useCallback } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { reducer, initialState, applyRollover } from '../state/reducer';

const STORAGE_KEY = 'studyboard_v5'; // same key as the original, so existing localStorage data carries over

function initLocal() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (d) {
      const parsed = JSON.parse(d);
      return applyRollover({ ...initialState, ...parsed, ideas: parsed.ideas || [] });
    }
  } catch (e) {
    /* ignore, fall through to defaults */
  }
  return applyRollover(initialState);
}

export function useStudyBoard(user) {
  const [state, dispatch] = useReducer(reducer, undefined, initLocal);

  // Always-fresh ref so the debounced save / first-push-up logic reads
  // the latest state even though it fires after a delay or from inside
  // a long-lived subscription closure.
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore */
    }
  }, [state]);

  const [syncStatus, setSyncStatus] = useState('connecting'); // connecting | saving | live | error
  const saveTimerRef = useRef(null);
  const docRefRef = useRef(null);

  const scheduleSave = useCallback(() => {
    if (!docRefRef.current) return;
    setSyncStatus('saving');
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        await setDoc(docRefRef.current, stateRef.current);
        setSyncStatus('live');
      } catch (e) {
        console.error('Firebase save error', e);
        setSyncStatus('error');
      }
    }, 600); // same 600ms debounce as the original save()
  }, []);

  // Subscribe to the user's doc once signed in — mirrors the original's
  // initFirebase()/onSnapshot wiring, including "first time for this
  // user — push local state up" behaviour.
  useEffect(() => {
    if (!user) {
      docRefRef.current = null;
      return;
    }
    const ref = doc(db, 'studyboard', user.uid);
    docRefRef.current = ref;
    setSyncStatus('connecting');
    let firstSnapshot = true;

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          dispatch({ type: 'HYDRATE', payload: snap.data() });
          setSyncStatus('live');
        } else if (firstSnapshot) {
          setDoc(ref, stateRef.current).catch(() => {});
        }
        firstSnapshot = false;
      },
      (err) => {
        console.error('Firebase listen error', err);
        setSyncStatus('error');
      }
    );
    return unsub;
  }, [user]);

  // Wrapped dispatch — every local mutation schedules a cloud save,
  // same as each mutation function in the original calling save() itself.
  // HYDRATE never goes through this (it's dispatched directly above),
  // so receiving remote data never triggers an immediate re-save.
  const act = useCallback(
    (action) => {
      dispatch(action);
      scheduleSave();
    },
    [scheduleSave]
  );

  const forceSave = useCallback(async () => {
    if (!docRefRef.current) return 'Firebase not ready yet.';
    setSyncStatus('saving');
    try {
      await setDoc(docRefRef.current, stateRef.current);
      setSyncStatus('live');
      return 'Synced! ✅';
    } catch (e) {
      setSyncStatus('error');
      return 'Sync failed.';
    }
  }, []);

  // Convenience action creators — mirrors each named function
  // (addTask, toggleTask, ...) from the original script almost 1:1.
  const actions = {
    addTask: (text, category, customMango, pri) => act({ type: 'ADD_TASK', payload: { text, category, customMango, pri } }),
    toggleTask: (id) => act({ type: 'TOGGLE_TASK', payload: id }),
    deleteTask: (id) => act({ type: 'DELETE_TASK', payload: id }),
    addIdea: (text) => act({ type: 'ADD_IDEA', payload: text }),
    toggleIdea: (id) => act({ type: 'TOGGLE_IDEA', payload: id }),
    deleteIdea: (id) => act({ type: 'DELETE_IDEA', payload: id }),
    updateStreakThresh: (value) => act({ type: 'UPDATE_STREAK_THRESH', payload: value }),
    toggleSetting: (key) => act({ type: 'TOGGLE_SETTING', payload: key }),
    addCType: () => act({ type: 'ADD_CTYPE' }),
    updateCType: (index, field, value) => act({ type: 'UPDATE_CTYPE', payload: { index, field, value } }),
    deleteCType: (index) => act({ type: 'DELETE_CTYPE', payload: index }),
    resetAll: () => act({ type: 'RESET_ALL' }),
  };

  return { state, actions, syncStatus, forceSave };
}
