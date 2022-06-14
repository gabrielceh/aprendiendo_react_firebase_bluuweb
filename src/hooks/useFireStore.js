import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
  where,
  getDoc,
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

//Configurar reglas de seguriddad para firestore:
// https://www.youtube.com/watch?v=300QVa-MQXs  1:03:50
// https://bluuweb.github.io/react-udemy/18-firebase-9/#reglas-de-seguridad

//https://firebase.google.com/docs/firestore/quickstart
export const useFireStore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({});

  // Creamos una funcion para obtener los datos
  const getData = async () => {
    // console.log(auth.currentUser);
    setLoading((prev) => ({ ...prev, getData: true }));
    try {
      // urls es el nombre de la coleccion (tabla) a la que queremos acceder
      const url_ref = collection(db, 'urls');
      // en caso de querer hacer una consulta
      const q = query(url_ref, where('uid', '==', auth.currentUser.uid));
      // filtros anidados
      // const q = query(
      //   url_ref,
      //   where('uid', '==', 'balbalbal'),
      //   where('nanoid', '==', 'xxx')
      // );

      // getDocs sin consulta
      // const querySnapshot = await getDocs(collection(db, 'urls'));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        //Data tiene todos los datos
        ...doc.data(),
      }));
      // console.log(dataDB);
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  //Agregar datos a firestore
  //https://firebase.google.com/docs/firestore/manage-data/add-data
  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));

      // Este es el formato del documento que creamos firestore
      const newDoc = {
        enabled: true,
        nanoid: nanoid(6),
        origin_url: url,
        uid: auth.currentUser.uid,
      };
      // En este caso nanoid hace tambien el papel del id unico
      const docRef = doc(db, 'urls', newDoc.nanoid);
      await setDoc(docRef, newDoc);
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  //Borrar datos de firestore
  //https://firebase.google.com/docs/firestore/manage-data/delete-data
  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, 'urls', nanoid);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.nanoid !== nanoid));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  //Actualizar datos
  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const updateData = async (nanoid, newurl) => {
    try {
      setLoading((prev) => ({ ...prev, updateData: true }));
      const docRef = doc(db, 'urls', nanoid);
      const newUpdataData = {
        origin_url: newurl,
      };
      await updateDoc(docRef, newUpdataData);
      setData(
        data.map((item) => (item.nanoid === nanoid ? { ...item, origin_url: newurl } : item))
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateData: false }));
    }
  };

  //Buscar Data
  const searchData = async (nanoid) => {
    try {
      const docRef = doc(db, 'urls', nanoid);
      const docSnap = await getDoc(docRef);

      return docSnap;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return { data, error, loading, getData, addData, deleteData, updateData, searchData };
};
