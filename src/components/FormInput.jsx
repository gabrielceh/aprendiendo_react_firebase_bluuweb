import React, { forwardRef, useState } from 'react';

//Este componente tiene las clases de tailwind con https://flowbite.com/docs/components/forms/

const FormInput = forwardRef(
  (
    { type, placeholder, onChange, onBlur, name, label, error, children, eyeButton = false },
    ref
  ) => {
    const [changeInput, setChangeInput] = useState(false);

    const errorClassLabel = error
      ? 'text-red-700 dark:text-red-500'
      : 'text-gray-900 dark:text-gray-300';

    const errorClassInput = error
      ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400'
      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

    const handleShowText = () => {
      setChangeInput(!changeInput);
    };

    return (
      <div className="mb-6">
        <label htmlFor={name} className={`block mb-2 text-sm font-medium ${errorClassLabel}`}>
          {label}
        </label>
        {eyeButton ? (
          <div className="flex">
            <input
              type={changeInput ? 'text' : 'password'}
              placeholder={placeholder}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              id={name}
              className={`rounded-none rounded-l-lg border block flex-1 min-w-0 w-full text-sm p-2.5 ${errorClassInput}`}
            />
            <div
              className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 cursor-pointer"
              onClick={handleShowText}
            >
              <span>{changeInput ? '🙈' : '👁'}</span>
            </div>
          </div>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            id={name}
            className={`border text-sm rounded-lg block w-full p-2.5 pr-3 ${errorClassInput}`}
          />
        )}

        {children}
      </div>
    );
  }
);

export default FormInput;
