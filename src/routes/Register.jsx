import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';

const Register = () => {
  const [email, setEmail] = useState('gabito@mail.com');
  const [password, setPassword] = useState('123123.');

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`procesando: ${email} - ${password}`);
    try {
      await registerUser(email, password);
      console.log('Usuario creado');
    } catch (error) {
      //para saber los errores
      console.log(error.code);
      // alert('Este email ya está registrado');
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
