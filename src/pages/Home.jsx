import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="hero is-primary is-bold mb-6">
        <div className="hero-body">
          <div className="container has-text-centered">
            {" "}
            {/* Added has-text-centered */}
            <h1 className="title is-1">Bienvenido al Gestor de Fechas</h1>
            <h2 className="subtitle is-3">
              Administra tus fechas importantes de manera sencilla
            </h2>
          </div>
        </div>
      </section>

      <div className="columns is-multiline is-centered">
        {" "}
        {/* Added is-centered */}
        {/* Tarjeta Ver Fechas */}
        {/* Tarjeta Ver Fechas */}
        <div className="column is-one-third">
          <div className="card has-text-centered">
            <div className="card-content">
              <div className="has-text-centered mb-4">
                <span className="icon is-large has-text-info mb-2">
                  <i className="fas fa-calendar-alt fa-2x"></i>
                </span>
                <p className="title is-4">Ver Fechas</p>
              </div>
              <div className="content has-text-centered">
                <p>Consulta todas las fechas registradas en el sistema.</p>
                <button
                  className="button is-info is-outlined mt-3"
                  onClick={() => navigate("/view-dates")}
                >
                  Ir a Ver Fechas
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tarjeta Agregar Fechas */}
        <div className="column is-one-third">
          <div className="card has-text-centered">
            <div className="card-content">
              <div className="has-text-centered mb-4">
                <span className="icon is-large has-text-success mb-2">
                  <i className="fas fa-plus-circle fa-2x"></i>
                </span>
                <p className="title is-4">Agregar Fechas</p>
              </div>
              <div className="content has-text-centered">
                <p>Añade nuevas fechas importantes a tu calendario.</p>
                <button
                  className="button is-success is-outlined mt-3"
                  onClick={() => navigate("/add-date")}
                >
                  Ir a Agregar Fechas
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tarjeta Estadísticas */}
        <div className="column is-one-third">
          <div className="card has-text-centered">
            <div className="card-content">
              <div className="has-text-centered mb-4">
                <span className="icon is-large has-text-warning mb-2">
                  <i className="fas fa-chart-bar fa-2x"></i>
                </span>
                <p className="title is-4">Estadísticas</p>
              </div>
              <div className="content has-text-centered">
                <p>Visualiza análisis y estadísticas de tus fechas.</p>
                <button
                  className="button is-warning is-outlined mt-3"
                  onClick={() => navigate("/stats")}
                >
                  Ver Estadísticas
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Sección de bienvenida */}
        <div className="column is-full mt-6">
          <div className="box has-background-light">
            <article className="message is-info">
              <div className="message-header has-text-centered">
                {" "}
                {/* Centered header */}
                <p>¡Comienza a gestionar tus fechas!</p>
              </div>
              <div className="message-body">
                <div className="content has-text-centered">
                  {" "}
                  {/* Centered content */}
                  <p className="mb-4">
                    Este sistema te permite administrar todas tus fechas
                    importantes en un solo lugar. Puedes agregar nuevas fechas,
                    editar las existentes, eliminarlas cuando ya no sean
                    necesarias y obtener estadísticas útiles.
                  </p>
                  <p className="mb-3">
                    <strong>Características principales:</strong>
                  </p>
                  <ul className="is-flex is-flex-direction-column is-align-items-center">
                    {" "}
                    {/* Centered list */}
                    <li>Registro sencillo de fechas importantes</li>
                    <li>Visualización clara y organizada</li>
                    <li>Filtrado y búsqueda de fechas</li>
                    <li>Estadísticas y reportes</li>
                    <li>Acceso seguro con autenticación</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
