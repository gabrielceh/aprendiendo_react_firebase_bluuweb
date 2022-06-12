// Funcion que me retornará el mensaje de error de firebase
//

export const erroresFirebase = (code) => {
  const customsErrors = {
    'auth/email-already-in-use': { code: 'email', message: 'Usuario ya registrado' },

    'auth/invalid-email': { code: 'email', message: 'Email no valido' },

    'auth/weak-password': {
      code: 'password',
      message: 'La contraseña debe ser de 6 carácteres o más',
    },

    'auth/user-not-found': { code: 'email', message: 'Usuario y/o contraseña equivocados' },

    'auth/wrong-password': { code: 'password', message: 'Usuario y/o contraseña equivocados' },
  };

  return customsErrors.hasOwnProperty(code) ? customsErrors[code] : 'Error en el servidor';
};
