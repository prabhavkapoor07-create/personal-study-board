import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Same Firebase project as the live index.html (tracker-6c3af) — this is
// not a secret; Firebase web config is meant to be public, access is
// controlled by Firestore security rules + auth, not by hiding this object.
const firebaseConfig = {
  apiKey: 'AIzaSyBh6wppS8eEBv4g6yhegxC9nfm3AJiokps',
  authDomain: 'tracker-6c3af.firebaseapp.com',
  projectId: 'tracker-6c3af',
  storageBucket: 'tracker-6c3af.firebasestorage.app',
  messagingSenderId: '812310991727',
  appId: '1:812310991727:web:43e66c6d32ad135f6cce9a',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
