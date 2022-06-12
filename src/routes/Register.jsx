import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  // https://react-hook-form.com/api/
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: 'gabito@gmail.com',
      password: '123456',
      repassword: '123456',
    },
  });

  const { required, patternEmail, minLength_6, validateTrim, validateEquals } = formValidate();

  // const customsErrors = {
  //   'auth/email-already-in-use': () =>
  //     setError('firebase', {
  //       message: 'Usuario ya registrado',
  //     }),
  //   'auth/invalid-email': () =>
  //     setError('firebase', {
  //       message: 'Email no valido',
  //     }),
  //   'auth/weak-password': () =>
  //     setError('firebase', {
  //       message: 'La contraseña debe ser de 6 carácteres o más',
  //     }),
  // };

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(email, password);

    try {
      await registerUser(email, password);
      console.log('Usuario creado');
      navigate('/');
    } catch (error) {
      //para saber los errores
      console.log(error.code);
      // alert('Este email ya está registrado');
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
      });
    }
  };

  return (
    <>
      <h1>Register</h1>
      {/* errores personalizados para firebase... no los trae firebase, fueron hechos desde cero */}
      {/* {errors.firebase && <p>{errors.firebase.message}</p>} */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          //https://react-hook-form.com/api/useform/register
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>

        {/* <input
          type="email"
          placeholder="Ingrese email"
          //https://react-hook-form.com/api/useform/register
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        /> */}
        {/* {errors.email && <p>{errors.email.message}</p>} */}
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
        {/* <input
          type="password"
          placeholder="Ingrese password"
          {...register('password', {
            required,
            minLength: minLength_6,
            validate: validateTrim,
          })}
        /> */}
        {/* {errors.password && <p>{errors.password.message}</p>} */}
        <FormError error={errors.password}></FormError>

        <FormInput
          type="password"
          placeholder="Repita su password"
          {...register('repassword', {
            required,
            validate: validateEquals(getValues('password')),
          })}
        ></FormInput>
        {/* {errors.repassword && <p>{errors.repassword.message}</p>} */}
        <FormError error={errors.repassword}></FormError>

        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
