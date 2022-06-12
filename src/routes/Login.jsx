import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  // https://react-hook-form.com/api/
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: 'gabito@gmail.com',
      password: '123456',
    },
  });

  const { required, patternEmail, minLength_6, validateTrim } = formValidate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(email, password);
    try {
      await loginUser(email, password);
      console.log('Sesión iniciada');
      navigate('/');
    } catch (error) {
      //para saber los errores
      console.log(error.code);
      // alert('Este email ya está registrado');
      setError('firebase', {
        message: erroresFirebase(error.code),
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(`procesando: ${email} - ${password}`);
  //   try {
  //     await loginUser(email, password);
  //     console.log('Sesion iniciada');
  //     navigate('/');
  //   } catch (error) {
  //     //para saber los errores
  //     console.log(error.code);
  //     // alert('Este email ya no está registrado');
  //   }
  // };

  return (
    <>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <FormError error={errors.firebase}></FormError>

        <FormInput
          type="email"
          placeholder="Ingrese email"
          //https://react-hook-form.com/api/useform/register
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>
        <FormError error={errors.email}></FormError>

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register('password', {
            required,
            minLength: minLength_6,
            validate: validateTrim,
          })}
        ></FormInput>
        <FormError error={errors.password}></FormError>

        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default Login;
