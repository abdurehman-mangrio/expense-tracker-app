import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load additional Firestore user data into auth state
  const loadUserData = async (user) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    const data = snap.exists() ? snap.data() : {};
    setCurrentUser({ ...user, ...data });
  };

  // Signup with email and password
  const signup = async (email, password, fullName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: fullName });

    // Save to Firestore
    await setDoc(doc(db, 'users', res.user.uid), {
      fullName,
      email: res.user.email,
      bio: '',
      theme: 'light',
    });

    await sendEmailVerification(res.user);
    await loadUserData(res.user);
  };

  const resendEmailVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await loadUserData(res.user);
  };

  const googleSignIn = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const ref = doc(db, 'users', res.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        fullName: res.user.displayName || '',
        email: res.user.email,
        bio: '',
        theme: 'light',
      });
    }

    await loadUserData(res.user);
  };

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) await loadUserData(user);
      else setCurrentUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup, // ✅ renamed
        login,
        logout,
        googleSignIn,
        resetPassword,
        resendEmailVerification,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
