import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP_p9Gld_bnpLvTqeSiQX_vq4tVqRUNyI",
  authDomain: "bookified-7b81b.firebaseapp.com",
  projectId: "bookified-7b81b",
  storageBucket: "bookified-7b81b.appspot.com",
  messagingSenderId: "474730893872",
  appId: "1:474730893872:web:018467ca09a99cb7be13f5",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const firebaseauth = getAuth(firebaseapp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseauth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseauth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseauth, email, password);
  };

  const signinWithGoogle = () => {
    signInWithPopup(firebaseauth, googleProvider);
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
