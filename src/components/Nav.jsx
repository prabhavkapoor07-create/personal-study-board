export default function Nav({ user, signingIn, onSignIn, onSignOut }) {
  return (
    <nav>
      <div className="brand">
        <svg className="brand-mark" viewBox="0 0 64 64">
          <path d="M8 14 C16 10 26 10 32 16 V52 C26 46 16 46 8 50 Z" fill="#FBF1E2" stroke="#2A2118" strokeWidth="2" />
          <path d="M56 14 C48 10 38 10 32 16 V52 C38 46 48 46 56 50 Z" fill="#FBF1E2" stroke="#2A2118" strokeWidth="2" />
          <path d="M32 16 V52" stroke="#2A2118" strokeWidth="2" />
          <path d="M44 12 L44 26 L48 21 L52 26 L52 12 Z" fill="#E8923E" />
        </svg>
        <span className="brand-word display">Study Board</span>
      </div>

      {!user && (
        <div className="signin" onClick={onSignIn}>
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>
          {signingIn ? 'Signing in…' : 'Sign in with Google'}
        </div>
      )}

      {user && (
        <div id="user-info" style={{ display: 'flex' }}>
          {user.photoURL && <img id="user-avatar" src={user.photoURL} alt="" style={{ display: 'block' }} />}
          <span id="user-name">{user.displayName || user.email}</span>
          <button id="signout-btn" onClick={onSignOut}>Sign out</button>
        </div>
      )}
    </nav>
  );
}
