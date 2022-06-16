import { createContext, useEffect, useState } from 'react';
import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { email, photoURL, displayName, uid, emailVerified } = user;
        setUser({
          email,
          photoURL,
          displayName,
          uid,
          emailVerified,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  useEffect(() => {}, [user]);

  //creamos al usuario https://firebase.google.com/docs/auth/web/start?hl=es&authuser=0
  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  //https://firebase.google.com/docs/auth/web/manage-users?hl=es&authuser=0#send_a_user_a_verification_email
  const sendVerificationMessage = () => sendEmailVerification(auth.currentUser);

  // const uploadPhotoToStorage = async (file, metadata) => {
  //   let photoUrl = '';
  //   const imageRef = ref(storage, `profile/${file.name}`);
  //   try {
  //     await uploadBytes(imageRef, file);
  //     const url = await getDownloadURL(imageRef);
  //     photoUrl = url;
  //     await updateMetadata(imageRef, metadata);
  //   } catch (error) {}

  //   console.log(photoUrl);
  //   return photoUrl;
  // };

  const data = {
    user,
    setUser,
    registerUser,
    loginUser,
    signOutUser,
    sendVerificationMessage,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserProvider;
