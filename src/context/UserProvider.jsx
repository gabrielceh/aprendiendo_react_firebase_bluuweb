import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({
          email,
          photoURL,
          displayName,
          uid,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  //creamos al usuario https://firebase.google.com/docs/auth/web/start?hl=es&authuser=0
  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  const data = {
    user,
    setUser,
    registerUser,
    loginUser,
    signOutUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserProvider;
