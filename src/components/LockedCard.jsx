export default function LockedCard({ onSignIn }) {
  return (
    <div className="locked-card" style={{ display: 'flex' }}>
      <h2 className="display">Sign in to open your board</h2>
      <p>Your tasks, streaks, and mangoes sync to your Google account — sign in to pick up where you left off.</p>
      <button id="locked-signin-btn" onClick={onSignIn}>
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
