import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';
import ButtonLoading from '../components/ButtonLoading';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  // https://react-hook-form.com/api/
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { required, patternEmail, minLength_6, validateTrim } = formValidate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      //para saber los errores
      // console.log(error.code);
      console.error('error');
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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Title text="Login" />
        <FormInput
          type="email"
          placeholder="ex: juan@correo.com"
          label="Your email"
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
          label="Your Password"
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
        <Button text="Iniciar sesión" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Login;
