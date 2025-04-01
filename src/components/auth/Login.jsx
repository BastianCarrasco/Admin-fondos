import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      if (username === 'admin' && password === '12345') {
        setIsLoggedIn(true);
        setError('');
        navigate('/'); // Redirige a Home después del login exitoso
      } else {
        setError('Credenciales incorrectas');
      }
    };
  
    return (
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box mt-6 p-5">
            <h1 className="title has-text-centered mb-5">Iniciar Sesión</h1>
            {error && <div className="notification is-danger mb-5">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="field mb-5">
                <label className="label mb-2">Usuario</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                  />
                </div>
              </div>
              <div className="field mb-5">
                <label className="label mb-2">Contraseña</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="12345"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-primary is-fullwidth" type="submit">
                    Ingresar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}