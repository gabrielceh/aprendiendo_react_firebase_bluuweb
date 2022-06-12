// Funcion que me retornará el mensaje de error de firebase
//

export const erroresFirebase = (code) => {
  const customsErrors = {
    'auth/email-already-in-use': 'Usuario ya registrado',

    'auth/invalid-email': 'Email no valido',

    'auth/weak-password': 'La contraseña debe ser de 6 carácteres o más',

    'auth/user-not-found': 'Usuario y/o contraseña equivocados',

    'auth/wrong-password': 'Usuario y/o contraseña equivocados',
  };

  return customsErrors.hasOwnProperty(code) ? customsErrors[code] : 'Error en el servidor';
};
