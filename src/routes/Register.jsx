import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // const [email, setEmail] = useState('gabito@mail.com');
  // const [password, setPassword] = useState('123123.');

  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: 'gabito@gmail.com',
    },
  });

  const customsErrors = {
    'auth/email-already-in-use': () =>
      setError('email', {
        message: 'Usuario ya registrado',
      }),
    'auth/invalid-email': () =>
      setError('email', {
        message: 'Email no valido',
      }),
    'auth/weak-password': () =>
      setError('password', {
        message: 'La contraseña debe ser de 6 carácteres o más',
      }),
  };

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
      if (customsErrors.hasOwnProperty(error.code)) {
        customsErrors[error.code]();
      } else {
        console.log('Ocurrió un error inesperado en el servidor');
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(`procesando: ${email} - ${password}`);
  //   try {
  //     await registerUser(email, password);
  //     console.log('Usuario creado');
  //     navigate('/')
  //   } catch (error) {
  //     //para saber los errores
  //     console.log(error.code);
  //     // alert('Este email ya está registrado');
  //   }
  // };

  return (
    <>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          //https://react-hook-form.com/api/useform/register
          {...register('email', {
            required: {
              value: true,
              message: 'Campo obligatorio',
            },
            pattern: {
              value: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
              message: 'Formato de email incorrecto',
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register('password', {
            setValueAs: (value) => value.trim(),
            minLength: {
              value: 6,
              message: 'Mínimo 6 carácteres',
            },
            validate: {
              trim: (value) => (!value.trim() ? 'Escribe algo' : true),
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Repita su password"
          {...register('repassword', {
            setValueAs: (value) => value.trim(),
            validate: {
              // https://react-hook-form.com/api/useform/getvalues
              equals: (value) => value === getValues('password') || 'No coincien las contraseñas',
              trim: (value) => (!value.trim() ? 'Escribe algo' : true),
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
