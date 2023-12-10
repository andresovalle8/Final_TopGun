// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ onRegistration }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      // Lógica de registro en el servidor
      const response = await fetch('URL_DEL_BACKEND/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        onRegistration();
      } else {
        console.error('Error al registrar usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegistration}>Registrarse</button>
    </div>
  );
};

export default RegistrationForm;
