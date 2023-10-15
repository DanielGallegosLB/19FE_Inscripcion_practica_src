import React, { useState } from 'react';
import { Home } from './components/Home';
import { CrearUsuario } from './components/CrearUsuario';
import { UsuarioEditar } from './components/UsuarioEditar';
import { CargarAlumnos } from './components/CargarAlumnos';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      
      <Router>
      <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/cargaralumnos">
            <button>Cargar Alumnos</button>
          </Link>
        </div>        
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CrearUsuario />} />
          <Route path="/edit" element={<UsuarioEditar />} />
          <Route path="/cargaralumnos" element={<CargarAlumnos />} />
        </Routes>
      </Router>
    </div>
  );
}
