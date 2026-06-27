import { useState, useRef, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { useStudyBoard } from './hooks/useStudyBoard';
import Nav from './components/Nav';
import Hero from './components/Hero';
import LockedCard from './components/LockedCard';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';

export default function App() {
  const { user, signingIn, signIn, signOut } = useAuth();
  const { state, actions, syncStatus, forceSave } = useStudyBoard(user);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const openBoard = () => {
    if (user) {
      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      signIn();
    }
  };

  return (
    <>
      <Toast message={toast} />

      <div className="hero-wrap">
        <div className="grain"></div>
        <Nav user={user} signingIn={signingIn} onSignIn={signIn} onSignOut={signOut} />
        <Hero streak={state.streak} totalMangoes={state.mangoes} showStreak={state.showStreak} onOpenBoard={openBoard} />
        <div className="wave">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path d="M0,40 C300,90 900,-10 1200,40 L1200,80 L0,80 Z" fill="#FBF1E2" />
          </svg>
        </div>
      </div>

      {!user && <LockedCard onSignIn={signIn} />}

      {user && (
        <Dashboard state={state} actions={actions} syncStatus={syncStatus} forceSave={forceSave} showToast={showToast} />
      )}
    </>
  );
}
