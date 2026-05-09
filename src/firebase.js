import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_iA-SW02PK-gczF6hZS7T3BQ9Ue3TZf8",
  authDomain: "expence-tracker-eafeb.firebaseapp.com",
  projectId: "expence-tracker-eafeb",
  storageBucket: "expence-tracker-eafeb.appspot.com",
  messagingSenderId: "778664341726",
  appId: "1:778664341726:web:df213198d84f8659db924f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
