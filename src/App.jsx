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
import { UsersManage } from './components/UsersManage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Publicas */}
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route path="/manageprofiles" element={<ManageProfiles />} />

        {/* Crud usuarios */}
        <Route element={<RequireAuth modulo={["IP_1"]} />}>
          
          <Route path="/cursos" element={<CursosMostrar />} />
          <Route path="/cursos/crear" element={<CursosCrear />} />
          <Route path="/cursos/editar" element={<CursosEditar />} />
          <Route path="/formatos" element={<CargarFormatos />} />
          <Route path="/formalumnos" element={<FormAlumnos />} />
          <Route path="/cargaralumnos" element={<CargarAlumnos />} />
        </Route>
        {/* CRUD Curso */}
        <Route element={<RequireAuth modulo={["IP_2"]} />}>
        </Route>
    
        <Route element={<RequireAuth modulo={["profesor"]} />}>
          <Route path="/cargaralumnos" element={<CargarAlumnos />} />

        </Route>
        


        <Route element={<RequireAuth modulo={["supervisor"]} />}>

        </Route>
        <Route element={<RequireAuth modulo={["IP_1"]} />}>
        <Route path='/usersmanage' element={<UsersManage />} />
        <Route path="/create" element={<CrearUsuario />} />
        <Route path="/edit" element={<UsuarioEditar />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

