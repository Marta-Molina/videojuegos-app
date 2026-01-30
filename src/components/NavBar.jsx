import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const NavBar = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-nav" role="banner">
      <div className="nav-inner">
        <div className="nav-left">
          <h2 className="logo">
            <NavLink to="/">GameCatalog</NavLink>
          </h2>
        </div>

        <div className="nav-right">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Inicio
          </NavLink>

          {!token && (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Iniciar sesión
              </NavLink>

              <NavLink to="/register" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Registrarse
              </NavLink>
            </>
          )}

          <NavLink to="/add-videojuego" className={({ isActive }) => (isActive ? "nav-link add-link active" : "nav-link add-link")}>
            Añadir videojuego
          </NavLink>

          {token && (
            <>
              <span className="nav-user">{user?.name || user?.email}</span>
              <button className="nav-logout" onClick={handleLogout}>Cerrar sesión</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
