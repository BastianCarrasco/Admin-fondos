import { useState, useEffect } from 'react';

export default function ViewDates() {
  const [fechas, setFechas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFechas = async () => {
      try {
        const response = await fetch('https://backend-fechas.onrender.com/fechas');
        if (!response.ok) {
          throw new Error('Error al obtener las fechas');
        }
        const data = await response.json();
        setFechas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFechas();
  }, []);

  if (loading) {
    return (
      <div className="box has-text-centered">
        <progress className="progress is-small is-primary" max="100">Cargando...</progress>
        <p className="mt-2">Obteniendo convocatorias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="box has-text-centered">
        <div className="notification is-danger">
          Error al cargar las fechas: {error}
        </div>
        <button 
          className="button is-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="box" style={{ backgroundColor: 'white', color: 'black' }}>
      <h2 className="title is-3 mb-5 has-text-centered" style={{ color: 'black' }}>Convocatorias Disponibles</h2>
      
      {fechas.length === 0 ? (
        <div className="notification is-warning has-text-centered" style={{ backgroundColor: 'white', color: 'black' }}>
          No hay convocatorias registradas actualmente
        </div>
      ) : (
        <div className="columns is-multiline is-centered">
          {fechas.map((convocatoria) => (
            <div key={convocatoria.id} className="column is-one-third">
              <div className="card" style={{ backgroundColor: 'wheat', border: '1px solid #ddd' }}>
                <div className="card-content has-text-centered" style={{ color: 'black' }}>
                  {/* Encabezado centrado */}
                  <div className="mb-4">
                    <span className="icon is-large has-text-primary mb-2" style={{ color: '#3273dc' }}>
                      <i className="fas fa-calendar-day fa-2x"></i>
                    </span>
                    <p className="title is-4" style={{ color: 'black' }}>{convocatoria.nombre}</p>
                    <p className="subtitle is-6" style={{ color: '#4a4a4a' }}>{convocatoria.plataforma}</p>
                  </div>
                  
                  {/* Fechas centradas */}
                  <div className="content" style={{ color: 'black' }}>
                    <div className="mb-3 has-text-centered">
                      <span className="icon-text is-justify-content-center">
                        <span className="icon has-text-info" style={{ color: '#3298dc' }}>
                          <i className="fas fa-play-circle"></i>
                        </span>
                        <span style={{ color: 'black' }}>Inicio: {convocatoria.fechaInicio}</span>
                      </span>
                    </div>
                    
                    <div className="mb-3 has-text-centered">
                      <span className="icon-text is-justify-content-center">
                        <span className="icon has-text-danger" style={{ color: '#f14668' }}>
                          <i className="fas fa-stop-circle"></i>
                        </span>
                        <span style={{ color: 'black' }}>Cierre: {convocatoria.fechaCierre}</span>
                      </span>
                    </div>
                    
                    {/* Botón centrado */}
                    <div className="has-text-centered">
                      <a 
                        href={convocatoria.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button is-small is-link is-outlined"
                        style={{ borderColor: '#3273dc', color: '#3273dc', backgroundColor: 'white' }}
                      >
                        <span  className="icon">
                          <i className="fas fa-external-link-alt"></i>
                        </span>
                        <span>Ver convocatoria</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}