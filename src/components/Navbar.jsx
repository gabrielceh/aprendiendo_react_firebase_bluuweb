import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={() => setUser(false)}>Salir</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
