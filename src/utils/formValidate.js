export const formValidate = () => {
  return {
    required: {
      value: true,
      message: 'Campo obligatorio',
    },
    patternEmail: {
      value: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
      message: 'Formato de email incorrecto',
    },
    minLength_6: {
      value: 6,
      message: 'Mínimo 6 carácteres',
    },
    validateTrim: {
      trim: (value) => (!value.trim() ? 'Campo vacio. Escribe algo' : true),
    },
    validateEquals(getValues) {
      return {
        // https://react-hook-form.com/api/useform/getvalues
        equals: (value) => value === getValues('password') || 'No coincien las contraseñas',
        trim: (value) => (!value.trim() ? 'Escribe algo' : true),
      };
    },
  };
};
