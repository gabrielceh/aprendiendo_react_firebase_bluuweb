// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Para trabajar con la base de datos de firestore
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage, ref } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAXiZzTlamThEDb6uwLwXbmyWVXVrCPdHs',
  authDomain: 'react-firebase-bluuweb.firebaseapp.com',
  projectId: 'react-firebase-bluuweb',
  storageBucket: 'react-firebase-bluuweb.appspot.com',
  messagingSenderId: '891315044828',
  appId: '1:891315044828:web:9ab8d4aa019fee8e1ccf19',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// configuracion de la base de datos de firestore
const db = getFirestore(app);
// configuracion con storage de firebase
const storage = getStorage();

export { auth, db, storage };
