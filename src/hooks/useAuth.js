import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';

// Direct port of the original Firebase module's auth listener + the
// window.googleSignIn / window.googleSignOut globals — just exposed as
// React state instead of toggling DOM nodes directly.
export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const signIn = useCallback(async () => {
    setSigningIn(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
      alert('Sign-in failed: ' + e.message);
    } finally {
      setSigningIn(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    if (!window.confirm('Sign out?')) return;
    await signOut(auth);
  }, []);

  return { user, authLoading, signingIn, signIn, signOut: signOutUser };
}
