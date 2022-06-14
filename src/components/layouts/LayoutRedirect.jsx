import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useFireStore } from '../../hooks/useFireStore';
import Title from '../Title';

const LayoutRedirect = () => {
  const { nanoid } = useParams();
  const [loading, setLoading] = useState(true);

  const { searchData } = useFireStore();

  useEffect(() => {
    searchData(nanoid)
      .then((docSnap) => {
        if (docSnap.exists()) {
          console.log(docSnap.data().origin_url);
          window.location.href = docSnap.data().origin_url;
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) return <Title text="Redirecting..."></Title>;

  return (
    <div className="mx-auto container">
      <Outlet />
    </div>
  );
};

export default LayoutRedirect;
