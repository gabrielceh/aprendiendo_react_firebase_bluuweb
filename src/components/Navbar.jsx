import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogOut = async (e) => {
    try {
      await signOutUser();
      console.log('sesion cerrada');
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <nav>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={handleClickLogOut}>Salir</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registarse</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
