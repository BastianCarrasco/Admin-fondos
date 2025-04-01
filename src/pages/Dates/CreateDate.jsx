import { useState } from 'react';

export default function CreateDate() {
  const [formData, setFormData] = useState({
    nombre: '',
    url: '',
    fechaInicio: '',
    fechaCierre: '',
    plataforma: 'CORFO'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Convierte fecha de formato input (aaaa-mm-dd) a formato ANID (d-m-aaaa)
  const formatToANIDDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    // Elimina ceros a la izquierda en día y mes
    return `${parseInt(day)}-${parseInt(month)}-${year}`;
  };

  // Convierte formato ANID (d-m-aaaa) a formato input (aaaa-mm-dd)
  const parseANIDDate = (anidDate) => {
    if (!anidDate) return '';
    
    // Maneja diferentes formatos que puedan llegar del backend
    if (anidDate.includes('/')) {
      const [day, month, year] = anidDate.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else if (anidDate.includes('-')) {
      const [day, month, year] = anidDate.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return '';
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: formatToANIDDate(value) // Guarda en formato ANID
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validación de fechas en formato ANID
      const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
      if (!dateRegex.test(formData.fechaInicio) || !dateRegex.test(formData.fechaCierre)) {
        throw new Error('Formato de fecha inválido. Use día-mes-año (ej: 1-2-2025)');
      }

      const response = await fetch('https://backend-fechas.onrender.com/fechas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al agregar la fecha');
      }

      const data = await response.json();
      console.log('Fecha agregada:', data);
      setSuccess(true);
      setFormData({
        nombre: '',
        url: '',
        fechaInicio: '',
        fechaCierre: '',
        plataforma: 'CORFO'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="box" style={{ backgroundColor: 'white', color: 'black' }}>
      <h2 className="title is-3 mb-4" style={{ color: 'black' }}>Agregar Nueva Convocatoria</h2>
      
      {error && <div className="notification is-danger mb-4">{error}</div>}
      {success && <div className="notification is-success mb-4">¡Convocatoria agregada exitosamente!</div>}

      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="field">
          <label className="label" style={{ color: 'black' }}>Nombre de la Convocatoria</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Anillos Regulares de Tecnología 2025"
              required
              style={{ backgroundColor: 'white', color: 'black', borderColor: '#dbdbdb' }}
            />
          </div>
        </div>

        {/* URL */}
        <div className="field">
          <label className="label" style={{ color: 'black' }}>URL de la Convocatoria</label>
          <div className="control">
            <input
              className="input"
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://anid.cl/concursos/concurso..."
              required
              style={{ backgroundColor: 'white', color: 'black', borderColor: '#dbdbdb' }}
            />
          </div>
        </div>

        {/* Fecha de Inicio */}
        <div className="field">
          <label className="label" style={{ color: 'black' }}>Fecha de Inicio (d-m-aaaa)</label>
          <div className="control">
            <input
              className="input"
              type="date"
              name="fechaInicio"
              value={parseANIDDate(formData.fechaInicio)}
              onChange={handleDateChange}
              required
              style={{ backgroundColor: 'white', color: 'black', borderColor: '#dbdbdb' }}
            />
            {formData.fechaInicio && (
              <p className="help">Formato ANID: {formData.fechaInicio}</p>
            )}
          </div>
        </div>

        {/* Fecha de Cierre */}
        <div className="field">
          <label className="label" style={{ color: 'black' }}>Fecha de Cierre (d-m-aaaa)</label>
          <div className="control">
            <input
              className="input"
              type="date"
              name="fechaCierre"
              value={parseANIDDate(formData.fechaCierre)}
              onChange={handleDateChange}
              required
              style={{ backgroundColor: 'white', color: 'black', borderColor: '#dbdbdb' }}
            />
            {formData.fechaCierre && (
              <p className="help">Formato ANID: {formData.fechaCierre}</p>
            )}
          </div>
        </div>

        {/* Plataforma */}
        <div className="field">
          <label className="label" style={{ color: 'black' }}>Plataforma</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                style={{ backgroundColor: 'white', color: 'black', borderColor: '#dbdbdb' }}
              >
                <option value="CORFO">CORFO</option>
                <option value="SENCE">SENCE</option>
                <option value="ANID">ANID</option>
                <option value="OTRO">OTRO</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
              disabled={isSubmitting}
            >
              Agregar Convocatoria
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}