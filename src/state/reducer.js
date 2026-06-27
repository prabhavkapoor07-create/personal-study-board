import { todayStr } from './dateUtils';

// Same default shape as the original `let S = {...}` in index.html.
export const initialState = {
  todos: [],
  ideas: [],
  mangoes: 0,
  streak: 0,
  bestStreak: 0,
  streakThresh: 10,
  history: {},
  taskLog: {},
  lastDate: null,
  customTypes: [
    { name: 'Studying', mango: 10 },
    { name: 'Reading', mango: 5 },
  ],
  showHeatmap: true,
  showStreak: true,
  totalTasksDone: 0,
};

// Same rollover rule as the original checkRollover(): once the calendar
// date has moved on, settle yesterday's streak and clear done todos.
export function applyRollover(state) {
  const today = todayStr();
  if (!state.lastDate) return { ...state, lastDate: today };
  if (state.lastDate === today) return state;

  const prev = state.history[state.lastDate] || 0;
  let streak = state.streak;
  let bestStreak = state.bestStreak;
  if (prev >= state.streakThresh) {
    streak = streak + 1;
    if (streak > bestStreak) bestStreak = streak;
  } else if (prev === 0) {
    streak = 0;
  }

  return {
    ...state,
    streak,
    bestStreak,
    todos: state.todos.filter((t) => !t.done),
    lastDate: today,
  };
}

// Same rule as the original checkStreak().
function checkStreak(state) {
  const mg = state.history[todayStr()] || 0;
  let streak = state.streak;
  let bestStreak = state.bestStreak;
  if (mg >= state.streakThresh && streak < 1) streak = 1;
  if (streak > bestStreak) bestStreak = streak;
  return { ...state, streak, bestStreak };
}

export function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      // Mirrors Object.assign(S, remote) in the original load()/onSnapshot.
      return { ...state, ...action.payload, ideas: action.payload.ideas || state.ideas || [] };
    }

    case 'ADD_TASK': {
      const { text, category, customMango, pri } = action.payload;
      let mg = 1;
      if (customMango && !isNaN(customMango)) {
        mg = parseInt(customMango, 10);
      } else if (category) {
        const cat = state.customTypes.find((c) => c.name === category);
        if (cat) mg = cat.mango;
      }
      const todo = { id: Date.now(), text, mango: mg, category, pri, done: false };
      return { ...state, todos: [...state.todos, todo] };
    }

    case 'TOGGLE_TASK': {
      const id = action.payload;
      const idx = state.todos.findIndex((t) => t.id === id);
      if (idx === -1) return state;
      const t = state.todos[idx];
      const today = todayStr();
      const todos = [...state.todos];
      let next;

      if (!t.done) {
        todos[idx] = { ...t, done: true };
        const log = state.taskLog[today] ? [...state.taskLog[today]] : [];
        log.push({
          text: t.text,
          mango: t.mango,
          category: t.category,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        });
        next = {
          ...state,
          todos,
          mangoes: state.mangoes + t.mango,
          history: { ...state.history, [today]: (state.history[today] || 0) + t.mango },
          taskLog: { ...state.taskLog, [today]: log },
          totalTasksDone: state.totalTasksDone + 1,
        };
      } else {
        todos[idx] = { ...t, done: false };
        const log = state.taskLog[today] ? [...state.taskLog[today]] : [];
        const i = log.findIndex((x) => x.text === t.text);
        if (i > -1) log.splice(i, 1);
        next = {
          ...state,
          todos,
          mangoes: Math.max(0, state.mangoes - t.mango),
          history: { ...state.history, [today]: Math.max(0, (state.history[today] || 0) - t.mango) },
          taskLog: { ...state.taskLog, [today]: log },
          totalTasksDone: Math.max(0, state.totalTasksDone - 1),
        };
      }
      return checkStreak(next);
    }

    case 'DELETE_TASK': {
      const id = action.payload;
      const t = state.todos.find((x) => x.id === id);
      if (!t) return state;
      let next = { ...state, todos: state.todos.filter((x) => x.id !== id) };
      if (t.done) {
        const today = todayStr();
        const log = state.taskLog[today] ? [...state.taskLog[today]] : [];
        const i = log.findIndex((x) => x.text === t.text);
        if (i > -1) log.splice(i, 1);
        next = {
          ...next,
          mangoes: Math.max(0, state.mangoes - t.mango),
          history: { ...state.history, [today]: Math.max(0, (state.history[today] || 0) - t.mango) },
          taskLog: { ...state.taskLog, [today]: log },
          totalTasksDone: Math.max(0, state.totalTasksDone - 1),
        };
        next = checkStreak(next);
      }
      return next;
    }

    case 'ADD_IDEA':
      return { ...state, ideas: [...state.ideas, { id: Date.now(), text: action.payload, done: false }] };

    case 'TOGGLE_IDEA':
      return { ...state, ideas: state.ideas.map((i) => (i.id === action.payload ? { ...i, done: !i.done } : i)) };

    case 'DELETE_IDEA':
      return { ...state, ideas: state.ideas.filter((i) => i.id !== action.payload) };

    case 'UPDATE_STREAK_THRESH':
      // Confirmation dialog happens in the component, same as the original's confirm().
      return { ...state, streakThresh: action.payload, streak: 0 };

    case 'TOGGLE_SETTING':
      return { ...state, [action.payload]: !state[action.payload] };

    case 'ADD_CTYPE':
      return { ...state, customTypes: [...state.customTypes, { name: 'New Category', mango: 5 }] };

    case 'UPDATE_CTYPE': {
      const { index, field, value } = action.payload;
      return {
        ...state,
        customTypes: state.customTypes.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
      };
    }

    case 'DELETE_CTYPE':
      return { ...state, customTypes: state.customTypes.filter((_, i) => i !== action.payload) };

    case 'RESET_ALL':
      return { ...initialState, lastDate: todayStr() };

    default:
      return state;
  }
}
