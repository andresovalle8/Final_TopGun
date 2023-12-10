import React from 'react';

const ModalInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{ marginBottom: '10px', padding: '8px' }}
  />
);

export default ModalInput;
