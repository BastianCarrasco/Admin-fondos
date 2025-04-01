import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/auth/Login.jsx';
import Home from './pages/Home';
import ViewDates from './pages/Dates/ViewDates';
import CreateDate from './pages/Dates/CreateDate'; // Asegúrate que esta importación sea correcta
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="app">
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className="container py-5">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="/view-dates" element={isLoggedIn ? <ViewDates /> : <Navigate to="/login" />} />
          <Route path="/create-date" element={isLoggedIn ? <CreateDate /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;