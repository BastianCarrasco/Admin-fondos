import { NavLink } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <strong>Fecha Manager</strong>
        </NavLink>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/view-dates" className={({ isActive }) => 
            `navbar-item ${isActive ? 'is-active' : ''}`
          }>
            Ver Fechas
          </NavLink>
          
          <NavLink to="/add-date" className={({ isActive }) => 
            `navbar-item ${isActive ? 'is-active' : ''}`
          }>
            Agregar Fechas
          </NavLink>
          
          <NavLink to="/delete-date" className={({ isActive }) => 
            `navbar-item ${isActive ? 'is-active' : ''}`
          }>
            Eliminar Fechas
          </NavLink>
          
          <NavLink to="/create-date" className={({ isActive }) => 
            `navbar-item ${isActive ? 'is-active' : ''}`
          }>
            Crear Fechas
          </NavLink>
          
          <NavLink to="/stats" className={({ isActive }) => 
            `navbar-item ${isActive ? 'is-active' : ''}`
          }>
            Estadísticas
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-light" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}