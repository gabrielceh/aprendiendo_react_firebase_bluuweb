export const formValidate = () => {
  return {
    required: {
      value: true,
      message: 'Required field',
    },
    patternEmail: {
      value: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
      message: 'Wrong email format',
    },
    patternUrl: {
      value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: 'Wrong url format',
    },
    minLength_6: {
      value: 6,
      message: 'Mínimo 6 carácteres',
    },
    validateTrim: {
      trim: (value) => (!value.trim() ? 'Empty field. Write something' : true),
    },
    validateEquals(valueField) {
      return {
        // https://react-hook-form.com/api/useform/getvalues
        equals: (value) => value === valueField || "Passwords don't match",
        // trim: (value) => (!value.trim() ? 'Empty field. Write something' : true),
      };
    },
  };
};
