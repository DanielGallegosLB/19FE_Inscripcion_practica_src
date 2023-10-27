import React, { useState } from 'react';
import { Home } from './components/Home';
import { CrearUsuario } from './components/CrearUsuario';
import { UsuarioEditar } from './components/UsuarioEditar';
import { CargarAlumnos } from './components/CargarAlumnos';
import { CursosMostrar } from './components/CursosMostrar';
import { CursosEditar } from './components/CursosEditar';
import { CursosCrear } from './components/CursosCrear';
import { CargarFormatos } from './components/CargarFormatos';
import { FormAlumnos } from './components/FormAlumnos.jsx';
import { IniciarSesion } from './components/IniciarSesion.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout } from './components/Layout';
import { Unauthorized } from './components/Unauthorized';
import { Missing } from './components/Missing.jsx';
import { Registrarse } from './components/Registrarse.jsx';
import { RequireAuth } from './components/RequireAuth';
import { ManageProfiles } from './components/ManageProfiles.jsx';


export default function App() {
  const localAPI = "http://localhost:3001";
  const remoteAPI1 = "https://one9backend.onrender.com";
  const remoteAPI2 = "https://19-backend.danielgallegosw.repl.co";

  const APIs = [localAPI, remoteAPI1, remoteAPI2];

  async function checkAPIs() {
    for (const api of APIs) {
      try {
        const response = await fetch(`${api}/ping`);
        if (response.status === 200) {
          return api; 
        }
      } catch (error) {
        console.log(`Fallo al conectar a ${api}`);
      }
    }
    return null; 
  }
  checkAPIs()
    .then((selectedAPI) => {
      if (selectedAPI) {
        console.log(`API seleccionada: ${selectedAPI}`);
      } else {
        console.log("No se pudo conectar a ninguna API.");
      }
    })
    .catch((error) => {
      console.error("Error al verificar las API:", error);
    });


  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Publicas */}
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route path="/manageprofiles" element={<ManageProfiles />} />

        {/* Administrador */}
        <Route element={<RequireAuth allowedRoles={["Administrador"]} />}>


          <Route path="/create" element={<CrearUsuario />} />
          <Route path="/edit" element={<UsuarioEditar />} />
          <Route path="/cursos" element={<CursosMostrar />} />
          <Route path="/cursos/crear" element={<CursosCrear />} />
          <Route path="/cursos/editar" element={<CursosEditar />} />
          <Route path="/formatos" element={<CargarFormatos />} />
          <Route path="/formalumnos" element={<FormAlumnos />} />
          <Route path="/cargaralumnos" element={<CargarAlumnos />} />
        </Route>
        {/* Director */}
        {/* Profesor */}
        <Route element={<RequireAuth allowedRoles={["profesor"]} />}>
          <Route path="/cargaralumnos" element={<CargarAlumnos />} />

        </Route>

        {/* Alumno */}
        {/* Supervisor */}
        <Route element={<RequireAuth allowedRoles={["supervisor"]} />}>

        </Route>

        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
