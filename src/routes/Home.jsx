import { useEffect, useState } from 'react';
import { useFireStore } from '../hooks/useFireStore';
import { useForm } from 'react-hook-form';
import { formValidate } from '../utils/formValidate';

import Title from '../components/Title';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import FormError from '../components/FormError';
import { erroresFirebase } from '../utils/erroresFirebase';

const Home = () => {
  const [editUrlNanoid, setEditUrlNanoid] = useState('');
  const [copied, setCopied] = useState({});

  const { data, error, loading, getData, addData, deleteData, updateData, userInfo } =
    useFireStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  const { required, patternUrl } = formValidate();

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;

  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    console.log(url);
    try {
      if (editUrlNanoid) {
        await updateData(editUrlNanoid, url);
        setEditUrlNanoid('');
        resetField('url');
      } else {
        await addData(url);
        resetField('url');
      }
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
    console.log(nanoid);
  };

  const handleClickUpdate = (nanoid, origin_url) => {
    console.log(nanoid, origin_url);
    setEditUrlNanoid(nanoid);
    setValue('url', origin_url);
  };

  const pathURL = window.location.href;

  const handleClickCopy = (nanoid) => {
    //usamos la apli clipboard: https://developer.mozilla.org/es/docs/Web/API/Clipboard_API
    navigator.clipboard
      .writeText(`${pathURL}${nanoid}`)
      .then(() => {
        setCopied({ [nanoid]: true });
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });

    setTimeout(() => {
      setCopied({});
    }, 60000);
  };

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="ex: https://youtube.com"
          label="Enter a url"
          //https://react-hook-form.com/api/useform/register
          {...register('url', {
            required,
            pattern: patternUrl,
          })}
          error={errors.url}
        >
          <FormError error={errors.url}></FormError>
        </FormInput>

        {editUrlNanoid ? (
          <>
            <Button type="submit" color="teal" text="Edit Url" loading={loading.updateData} />
          </>
        ) : (
          <Button type="submit" color="purple" text="Add Url" loading={loading.addData} />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 mb-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {' '}
            {pathURL + item.nanoid}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            URL original: {item.origin_url}
          </p>
          <div className="flex space-x-2">
            <Button
              type="button"
              color="red"
              text="Delete"
              onClick={(e) => handleClickDelete(item.nanoid)}
              loading={loading[item.nanoid]}
            />
            <Button
              type="button"
              color="emerald"
              text="Edit"
              onClick={(e) => handleClickUpdate(item.nanoid, item.origin_url)}
            />
            <Button
              type="button"
              color="pink"
              text={copied[item.nanoid] ? '✅Copied' : 'Copy'}
              onClick={(e) => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
