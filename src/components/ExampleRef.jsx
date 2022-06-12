import React, { forwardRef, useRef } from 'react';

//forwardRef permite pasar referencias a los componentes
const InputText = forwardRef((props, ref) => {
  return (
    <>
      <input type="text" ref={ref} />
    </>
  );
});

const ExampleRef = () => {
  const inputFocusRef = useRef(null);

  const handleClick = () => {
    console.log('click 😎');
    inputFocusRef.current.focus();
    inputFocusRef.current.style.color = 'red';
  };

  return (
    <>
      <InputText ref={inputFocusRef} />
      {/* <input type="text" name="" id="" ref={inputFocusRef} /> */}
      <button onClick={handleClick}>Click Ref</button>
    </>
  );
};

export default ExampleRef;
