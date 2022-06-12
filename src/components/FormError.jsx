import React from 'react';

//Este componente tiene las clases de tailwind con https://flowbite.com/docs/components/forms/

const FormError = ({ error }) => {
  return (
    <>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops! </span>
          <span>{error.message}</span>
        </p>
      )}
    </>
  );
};

export default FormError;
