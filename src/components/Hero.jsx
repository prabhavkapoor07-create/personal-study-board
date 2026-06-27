export default function Hero({ streak, totalMangoes, showStreak, onOpenBoard }) {
  return (
    <div className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Personal Study Board</span>
        <h1 className="display">
          Plant a task.<br />Grow your <em>orchard</em>.
        </h1>
        <p>Every task you finish drops a mango. Every streak you keep grows the tree a little taller. Your whole study habit, in one warm little orchard.</p>
        <div className="cta-row">
          <button className="btn-primary" onClick={onOpenBoard}>Open my board</button>
          <a className="btn-ghost-link" href="#dashboard">See how streaks work</a>
        </div>
      </div>

      <div className="hero-art">
        <div className="glow"></div>
        <svg className="tree-svg" viewBox="0 0 300 300">
          <defs>
            <radialGradient id="mangoFruit" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#F4B074" />
              <stop offset="100%" stopColor="#C96E2B" />
            </radialGradient>
          </defs>
          <ellipse cx="150" cy="262" rx="70" ry="14" fill="#4F6B41" opacity="0.55" />
          <path d="M150 260 C146 220 152 190 144 150" stroke="#7A5230" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M144 150 C130 140 118 142 108 130" stroke="#7A5230" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M147 160 C160 150 172 150 184 138" stroke="#7A5230" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="150" cy="118" r="74" fill="#5B7A4D" />
          <circle cx="100" cy="140" r="50" fill="#4F6B41" />
          <circle cx="205" cy="140" r="48" fill="#4F6B41" />
          <circle cx="150" cy="90" r="56" fill="#6E8F5C" />
          <circle cx="120" cy="105" r="22" fill="#86A874" opacity="0.7" />
          <g>
            <circle cx="118" cy="120" r="13" fill="url(#mangoFruit)" />
            <circle cx="178" cy="100" r="11" fill="url(#mangoFruit)" />
            <circle cx="160" cy="150" r="14" fill="url(#mangoFruit)" />
            <circle cx="95" cy="160" r="10" fill="url(#mangoFruit)" />
            <circle cx="200" cy="155" r="12" fill="url(#mangoFruit)" />
            <circle cx="140" cy="80" r="9" fill="url(#mangoFruit)" />
          </g>
          <circle cx="55" cy="70" r="3" fill="#E8923E" opacity="0.8" />
          <circle cx="245" cy="190" r="4" fill="#E8923E" opacity="0.6" />
          <circle cx="240" cy="60" r="2.5" fill="#F4B074" opacity="0.8" />
        </svg>
        {/* tree is still static art — growth tied to data is the deferred "orchard grows" feature */}

        {showStreak && (
          <div className="chip chip-streak">
            <svg viewBox="0 0 64 64">
              <defs>
                <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#C2502E" />
                  <stop offset="100%" stopColor="#F2A75C" />
                </linearGradient>
              </defs>
              <path d="M32 6 C40 18 48 24 44 38 C41 49 33 56 24 52 C14 48 12 36 18 28 C16 34 20 36 22 34 C20 26 24 14 32 6 Z" fill="url(#flameGrad)" />
              <path d="M30 30 C34 36 36 40 32 46 C28 49 23 47 23 42 C23 38 26 34 30 30 Z" fill="#FBD9A8" opacity="0.6" />
              <circle cx="27" cy="40" r="1.6" fill="#3A2412" />
              <circle cx="35" cy="39" r="1.6" fill="#3A2412" />
              <path d="M28 46 Q31 49 35 45" stroke="#3A2412" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <div>
              <div className="n mono">{streak}</div>
              <div className="l">day streak</div>
            </div>
          </div>
        )}

        <div className="chip chip-mango">
          <svg viewBox="0 0 64 64">
            <defs>
              <linearGradient id="mangoGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2A75C" />
                <stop offset="100%" stopColor="#C96E2B" />
              </linearGradient>
            </defs>
            <path d="M32 8 C36 4 44 4 44 12 C44 18 36 16 32 8 Z" fill="#6E8F5C" />
            <path d="M14 30 C14 16 26 8 36 12 C48 16 52 30 46 44 C40 58 22 58 16 46 C12 40 12 36 14 30 Z" fill="url(#mangoGrad2)" />
            <ellipse cx="24" cy="24" rx="6" ry="9" fill="#FBD9A8" opacity="0.55" />
            <circle cx="26" cy="34" r="2" fill="#3A2412" />
            <circle cx="36" cy="33" r="2" fill="#3A2412" />
            <path d="M27 41 Q31 45 36 40" stroke="#3A2412" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div>
            <div className="n mono">{totalMangoes}</div>
            <div className="l">total mangoes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
