import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';

import Title from '../Title';

const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.emailVerified === false) {
    return (
      <div className="container mx-auto">
        <Title text="Please check your email" />
        <p className="text-center">
          🤗 If you haven't received the verification email, please check your spam folder 🤗
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
