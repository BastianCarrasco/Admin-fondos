// src/pages/Dates/AddDate.jsx
import { useState } from 'react';

export default function AddDate() {  // Nota el 'export default'
  const [nuevaFecha, setNuevaFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para agregar fecha
  };

  return (
    <div className="box">
      <h2 className="title is-3">Agregar Fecha</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nueva Fecha</label>
          <div className="control">
            <input
              className="input"
              type="date"
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="button is-primary">
          Agregar Fecha
        </button>
      </form>
    </div>
  );
}