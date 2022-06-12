import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';

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
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* <FormError error={errors.firebase}></FormError> */}
        <Title text="Login" />
        <FormInput
          type="email"
          placeholder="ex: juan@correo.com"
          label="Ingresa tu email"
          error={errors.email}
          //https://react-hook-form.com/api/useform/register
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        >
          <FormError error={errors.email}></FormError>
        </FormInput>

        <FormInput
          type="password"
          placeholder=" "
          label="Ingresa tu password"
          error={errors.password}
          {...register('password', {
            required,
            minLength: minLength_6,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password}></FormError>
        </FormInput>

        <Button text="Iniciar sesión" type="submit" />
      </form>
    </>
  );
};

export default Login;
