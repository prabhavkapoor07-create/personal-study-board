import { todayStr } from '../state/dateUtils';

export default function StatsGrid({ state }) {
  const todayMg = state.history[todayStr()] || 0;
  const done = state.todos.filter((t) => t.done).length;
  const total = state.todos.length;
  const streakStatus = todayMg >= state.streakThresh ? '✅ streak safe!' : (state.streakThresh - todayMg) + ' more to streak';

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <svg viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2A75C" />
              <stop offset="100%" stopColor="#C96E2B" />
            </linearGradient>
          </defs>
          <path d="M32 8 C36 4 44 4 44 12 C44 18 36 16 32 8 Z" fill="#6E8F5C" />
          <path d="M14 30 C14 16 26 8 36 12 C48 16 52 30 46 44 C40 58 22 58 16 46 C12 40 12 36 14 30 Z" fill="url(#g1)" />
          <ellipse cx="24" cy="24" rx="6" ry="9" fill="#FBD9A8" opacity="0.55" />
          <circle cx="26" cy="34" r="2" fill="#3A2412" />
          <circle cx="36" cy="33" r="2" fill="#3A2412" />
          <path d="M27 41 Q31 45 36 40" stroke="#3A2412" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div className="num mono">{todayMg} 🥭</div>
        <div className="lab">Today's Mangoes</div>
        <div className="lab-sub">{streakStatus}</div>
      </div>

      <div className="stat-card">
        <svg viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g2" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#C2502E" />
              <stop offset="100%" stopColor="#F2A75C" />
            </linearGradient>
          </defs>
          <path d="M32 6 C40 18 48 24 44 38 C41 49 33 56 24 52 C14 48 12 36 18 28 C16 34 20 36 22 34 C20 26 24 14 32 6 Z" fill="url(#g2)" />
          <path d="M30 30 C34 36 36 40 32 46 C28 49 23 47 23 42 C23 38 26 34 30 30 Z" fill="#FBD9A8" opacity="0.6" />
          <circle cx="27" cy="40" r="1.6" fill="#3A2412" />
          <circle cx="35" cy="39" r="1.6" fill="#3A2412" />
          <path d="M28 46 Q31 49 35 45" stroke="#3A2412" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <div className="num mono">{state.bestStreak} 🔥</div>
        <div className="lab">Best Streak</div>
      </div>

      <div className="stat-card">
        <svg viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="#6E8F5C" />
          <path d="M21 33 L29 41 L44 24" stroke="#FBF1E2" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="num mono">{done}/{total}</div>
        <div className="lab">Tasks Done Today</div>
      </div>

      <div className="stat-card">
        <svg viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F2A75C" />
              <stop offset="100%" stopColor="#C96E2B" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="26" fill="none" stroke="url(#g3)" strokeWidth="4" />
          <path d="M32 14 C36 10 42 10 42 16 C42 20 36 19 32 14 Z" fill="#6E8F5C" />
        </svg>
        <div className="num mono">{state.mangoes}</div>
        <div className="lab">Total Mangoes</div>
      </div>
    </div>
  );
}
