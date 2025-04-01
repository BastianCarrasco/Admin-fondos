import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [fechas, setFechas] = useState([]); // Estado para almacenar las fechas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [newFecha, setNewFecha] = useState(''); // Estado para el valor de la nueva fecha
  const [fechaAdded, setFechaAdded] = useState(false); // Estado para mostrar mensaje después de agregar la fecha

  // Realizar el fetch cuando el componente se monte
  useEffect(() => {
    const fetchFechas = async () => {
      try {
        const response = await fetch('https://backend-fechas.onrender.com/fechas');
        const data = await response.json();
        if (data && Array.isArray(data.fechas)) { // Asegurarse de que data.fechas sea un array
          setFechas(data.fechas);
        } else {
          console.error('La respuesta no contiene un arreglo de fechas');
        }
        setLoading(false); // Desactivar la carga
      } catch (error) {
        console.error('Error al obtener las fechas:', error);
        setLoading(false); // Asegurarse de desactivar la carga en caso de error
      }
    };

    fetchFechas();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  // Función para manejar el envío del formulario (POST)
  const handlePostFecha = async (e) => {
    e.preventDefault();

    if (newFecha) {
      try {
        const response = await fetch('https://backend-fechas.onrender.com/fechas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fecha: newFecha, // Enviar la nueva fecha
          }),
        });

        if (response.ok) {
          setFechaAdded(true); // Indicar que la fecha fue agregada
          setNewFecha(''); // Limpiar el input

          // Volver a cargar las fechas después de agregar una nueva
          const data = await response.json();
          if (data && Array.isArray(data.fechas)) {
            setFechas(data.fechas); // Actualizar la lista de fechas
          }
        }
      } catch (error) {
        console.error('Error al agregar la fecha:', error);
      }
    } else {
      alert('Por favor ingresa una fecha válida.');
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* Mostrar las fechas o mensaje de carga */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {loading ? (
        <p>Loading...</p> // Mensaje de carga
      ) : (
        <div>
          <h2>Fechas:</h2>
          <ul>
            {fechas.length > 0 ? (
              fechas.map((fecha) => (
                <li key={fecha.id}>
                  {fecha.fecha} {/* Accediendo a la propiedad "fecha" */}
                </li>
              ))
            ) : (
              <p>No hay fechas disponibles</p> // Mostrar un mensaje si no hay fechas
            )}
          </ul>
        </div>
      )}

      {/* Sección para agregar nueva fecha */}
      <div className="add-fecha">
        <h2>Agregar nueva fecha</h2>
        <form onSubmit={handlePostFecha}>
          <input 
            type="text" 
            value={newFecha}
            onChange={(e) => setNewFecha(e.target.value)} 
            placeholder="Ingresa la fecha"
          />
          <button type="submit">Agregar Fecha</button>
        </form>
        {fechaAdded && <p>¡Fecha agregada con éxito!</p>}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
