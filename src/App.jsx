import React, { useState } from 'react';
import { Home } from './components/Home';
import { CrearUsuario } from './components/CrearUsuario';
import { UsuarioEditar } from './components/UsuarioEditar';
import { CargarAlumnos } from './components/CargarAlumnos';
import { CursosMostrar } from './components/CursosMostrar';
import { CursosEditar } from './components/CursosEditar';
import { CursosCrear } from './components/CursosCrear';
import { CargarFormatos } from './components/CargarFormatos';
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
          <Link to="/cursos">
            <button>Cursos</button>
          </Link>
          <Link to="/formatos">
            <button>Crear Formato</button>
          </Link>
        </div>
              
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CrearUsuario />} />
          <Route path="/edit" element={<UsuarioEditar />} />
          <Route path="/cargaralumnos" element={<CargarAlumnos />} />
          <Route path="/cursos" element={<CursosMostrar />} />
          <Route path="/cursos/crear" element={<CursosCrear />} />
          <Route path="/cursos/editar" element={<CursosEditar />} />
          <Route path="/formatos" element={<CargarFormatos />} />
        </Routes>
      </Router>
    </div>
  );
}
