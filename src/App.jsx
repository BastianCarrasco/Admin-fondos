import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/auth/Login.jsx';
import Home from './pages/Home';
import ViewDates from './pages/Dates/ViewDates';
//import AddDate from './pages/Dates/AddDate';
//import DeleteDate from './pages/Dates/DeleteDate';
//import CreateDate from './pages/Dates/CreateDate';
//import Stats from './pages/Dates/Stats';
import 'bulma/css/bulma.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/'); // Redirige a Home después del login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login'); // Redirige al login después del logout
  };

  return (
    <div className="app">
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className="container py-5">
        <Routes>
          <Route path="/" element={
            isLoggedIn ? <Home /> : <Navigate to="/login" />
          } />
          <Route path="/login" element={
            <Login setIsLoggedIn={handleLogin} />
          } />
          <Route path="/view-dates" element={
            isLoggedIn ? <ViewDates /> : <Navigate to="/login" />
          } />
          {/* <Route path="/add-date" element={
            isLoggedIn ? <AddDate /> : <Navigate to="/login" />
          } />
          <Route path="/delete-date" element={
            isLoggedIn ? <DeleteDate /> : <Navigate to="/login" />
          } />
          <Route path="/create-date" element={
            isLoggedIn ? <CreateDate /> : <Navigate to="/login" />
          } />
          <Route path="/stats" element={
            isLoggedIn ? <Stats /> : <Navigate to="/login" />
          } /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;