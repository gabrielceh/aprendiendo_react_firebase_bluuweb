import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';
import ButtonLoading from '../components/ButtonLoading';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { registerUser, sendVerificationMessage } = useContext(UserContext);

  // https://react-hook-form.com/api/
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

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
    const { email, password, repassword } = data;
    try {
      if (password !== repassword) {
        setError('repassword', { message: "Passwords don't match" });
        return;
      }
      setLoading(true);
      await registerUser(email, password);
      await sendVerificationMessage();
      navigate('/');
    } catch (error) {
      //para saber los errores
      // console.log(error.message);
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* errores personalizados para firebase... no los trae firebase, fueron hechos desde cero */}
      {/* {errors.firebase && <p>{errors.firebase.message}</p>} */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Title text="Register" />
        <FormInput
          type="email"
          placeholder="ex: juan@correo.com"
          label="Tu email"
          error={errors.email}
          //https://react-hook-form.com/api/useform/register
          {...register('email', {
            required,
            pattern: patternEmail,
          })}
        >
          <FormError error={errors.email}></FormError>
        </FormInput>

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

        <FormInput
          type="password"
          placeholder=" "
          label="Tu password"
          error={errors.password}
          eyeButton={true}
          {...register('password', {
            required,
            minLength: minLength_6,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password}></FormError>
        </FormInput>
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

        <FormInput
          type="password"
          placeholder=" "
          label="Confirmar su password"
          error={errors.repassword}
          eyeButton={true}
          {...register('repassword', {
            required,
            validate: validateTrim,
            // validate: validateEquals(getValues('password')),
          })}
        >
          <FormError error={errors.repassword}></FormError>
        </FormInput>
        {/* {errors.repassword && <p>{errors.repassword.message}</p>} */}

        <Button text="Registrar" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Register;
