import React, { useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { useForm } from 'react-hook-form';
import { formValidate } from '../utils/formValidate';
import { erroresFirebase } from '../utils/erroresFirebase';
import { useFireStore } from '../hooks/useFireStore';
import queryString from 'query-string'; //npm install query-string

import Title from '../components/Title';
import FormInput from '../components/FormInput';
import FormError from '../components/FormError';
import FormInputFile from '../components/FormInputFile';
import Button from '../components/Button';

const EditProfile = () => {
  // const { email } = useParams();
  const { user } = useContext(UserContext);
  const { updateUserProfile, error, loading } = useFireStore();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm({
    defaultValues: {
      name: user.displayName,
    },
  });

  const { required } = formValidate();

  const { q = '' } = queryString.parse(location.search);

  if (user.email !== q) {
    return <Title text={"Error: can't edit to " + q} />;
  }

  const onSubmit = async (data) => {
    // console.log(user);
    const { name, userPhoto } = data;
    try {
      let picFile = userPhoto[0];

      if (!picFile) {
        await updateUserProfile(name);
        window.location.reload();
        return;
      }
      if (picFile.type !== 'image/png' && picFile.type !== 'image/jpeg') {
        setError('userPhoto', { message: 'Only png and jpg formats are supported' });
        return;
      }
      if (picFile.size > 245760) {
        setError('userPhoto', { message: 'Image size should be less than 240kb' });
        return;
      }

      const metadata = {
        contentType: picFile.type,
        name: picFile.name,
        customMetadata: {
          uidUser: user.uid,
          email: user.email,
        },
      };

      await updateUserProfile(name, picFile, metadata);
      window.location.reload();

      if (error) {
        console.log(error.code);
      }
    } catch (err) {
      console.log(error);
      console.log(err);
      const { code, message } = erroresFirebase(err.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text="Edit Profile" />
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto w-4/5 lg:w-3/5"
      >
        <FormInput
          type="text"
          placeholder="ex: John Smith"
          label="Your new name"
          //https://react-hook-form.com/api/useform/register
          {...register('name', {
            required,
          })}
          error={errors.name}
        >
          <FormError error={errors.name}></FormError>
        </FormInput>

        <FormInputFile
          type="file"
          label="your profile photo"
          {...register('userPhoto', {})}
          error={errors.userPhoto}
        >
          <FormError error={errors.userPhoto}></FormError>
        </FormInputFile>
        <Button type="submit" color="cyan" text="Acept" loading={loading.updateProfile} />
      </form>
    </>
  );
};

export default EditProfile;
