import React, { useState, useEffect } from "react";

export default function EditarFechas() {
  const [fechas, setFechas] = useState([]);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [sortBy, setSortBy] = useState("nombre");
  const [formData, setFormData] = useState({
    nombre: "",
    url: "",
    fechaInicio: "",
    fechaCierre: "",
    plataforma: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFechas();
  }, []);

  const fetchFechas = async () => {
    try {
      const response = await fetch("https://backend-fechas.onrender.com/fechas");
      if (!response.ok) throw new Error("Error al obtener las fechas");
      const data = await response.json();
      setFechas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    const id = parseInt(event.target.value);
    const fecha = fechas.find((f) => f.id === id);
    setSelectedFecha(fecha);
    setFormData({ ...fecha });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFecha) return;

    try {
      const response = await fetch(`https://backend-fechas.onrender.com/fechas/${selectedFecha.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error al actualizar la fecha");
      alert("Fecha actualizada correctamente");
      fetchFechas();
    } catch (err) {
      setError(err.message);
    }
  };

  const sortedFechas = [...fechas].sort((a, b) => {
    if (sortBy === "fechaInicio" || sortBy === "fechaCierre") {
      return new Date(a[sortBy]) - new Date(b[sortBy]);
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="box">
      <h2 className="title is-3">Editar Fechas</h2>
      
      <div className="field">
        <label className="label">Ordenar por:</label>
        <div className="control">
          <div className="select">
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="nombre">Nombre</option>
              <option value="fechaInicio">Fecha de Inicio</option>
              <option value="fechaCierre">Fecha de Cierre</option>
              <option value="plataforma">Plataforma</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Seleccionar Fecha</label>
        <div className="control">
          <div className="select">
            <select onChange={handleSelectChange} defaultValue="">
              <option value="" disabled>Selecciona una fecha</option>
              {sortedFechas.map((fecha) => (
                <option key={fecha.id} value={fecha.id}>
                  {fecha.nombre} ({fecha.fechaInicio} - {fecha.fechaCierre}) [{fecha.plataforma}]
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedFecha && (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input className="input" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label className="label">URL</label>
            <div className="control">
              <input className="input" type="url" name="url" value={formData.url} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label className="label">Fecha Inicio</label>
            <div className="control">
              <input className="input" type="text" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label className="label">Fecha Cierre</label>
            <div className="control">
              <input className="input" type="text" name="fechaCierre" value={formData.fechaCierre} onChange={handleChange} required />
            </div>
          </div>

          <div className="field">
            <label className="label">Plataforma</label>
            <div className="control">
              <input className="input" type="text" name="plataforma" value={formData.plataforma} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="button is-primary">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
}
