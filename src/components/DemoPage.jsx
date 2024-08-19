import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { CrearUsuario } from './CrearUsuario';
import { UsuarioEditar } from './UsuarioEditar';
import { CargarAlumnos } from './CargarAlumnos';
import { CursosMostrar } from './CursosMostrar';
import { CursosEditar } from './CursosEditar';
import { CursosCrear } from './CursosCrear';
import { CargarFormatos } from './CargarFormatos';
import { DescargarFormatos } from './DescargarFormatos.jsx';
import { FormAlumnos } from './FormAlumnos.jsx';
import { IniciarSesion } from './IniciarSesion.jsx';
import { Layout } from './Layout';
import { Unauthorized } from './Unauthorized';
import { Registrarse } from './Registrarse.jsx';
import { RequireAuth } from './RequireAuth';
import { ManageProfiles } from './ManageProfiles.jsx';
import { UsersManage } from './UsersManage.jsx';
import Navbar from './Navbar.jsx';
import { SubirInforme } from './SubirInforme.jsx';
import { PortalProfesor } from './PortalProfesor.jsx';
import { CursoMostrar } from './CursoMostrar.jsx';
import { CursoCrear } from './CursoCrear.jsx';
import { PortalAlumno } from './PortalAlumno.jsx';
import { PortalSupervisor } from './PortalSupervisor.jsx';
import { MiPerfil } from './MiPerfil.jsx';
import { ProfilesCreate } from './ProfilesCreate.jsx';
import { PortalAdmin } from './PortalAdmin.jsx';
import { RegistrarSupervisor } from './RegistrarSupervisor.jsx';
import { IniciarSesionSupervisor } from './IniciarSesionSupervisor.jsx';
import { LandingPage } from './LandingPage.jsx';
import { Missing } from './Missing.jsx';

const DemoPage = () => {
  const [userType, setUserType] = useState('guest');

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">Demo Page</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Administrador</h2>
        <ul className="list-disc list-inside mb-4">
          <li><Link to="/manageprofiles" className="text-blue-500">Permisos de Perfiles</Link></li>
          <li><Link to="/usersmanage" className="text-blue-500">Usuarios</Link></li>
          <li><Link to="/cursos" className="text-blue-500">Cursos</Link></li>
          <li><Link to="/formatos/manejar" className="text-blue-500">Subir Documentación</Link></li>
        </ul>
        
        <h2 className="text-xl font-bold mb-2">Profesor</h2>
        <ul className="list-disc list-inside mb-4">
          <li><Link to="/registrarse" className="text-blue-500">Registrarse</Link></li>
          <li><Link to="/iniciar-sesion" className="text-blue-500">Inicio Sesión</Link></li>
          <li><Link to="/portalprofesor/curso" className="text-blue-500">Manejar Curso</Link></li>
          <li><Link to="/cargaralumnos" className="text-blue-500">Cargar Alumnos</Link></li>
          <li><Link to="/informes" className="text-blue-500">Calificar Informe</Link></li>
        </ul>
        
        <h2 className="text-xl font-bold mb-2">Alumno</h2>
        <ul className="list-disc list-inside mb-4">
          <li><Link to="/informe" className="text-blue-500">Subir Informe</Link></li>
          <li><Link to="/formalumnos" className="text-blue-500">Llenar Formulario</Link></li>
          <li><Link to="/miperfil" className="text-blue-500">Consultar Nota</Link></li>
          <li><Link to="/formatos" className="text-blue-500">Consultar Documentación</Link></li>
        </ul>
        
        <h2 className="text-xl font-bold mb-2">Supervisor</h2>
        <ul className="list-disc list-inside mb-4">
          <li><Link to="/registrar-supervisor" className="text-blue-500">Registrar</Link></li>
          <li><Link to="/iniciar-sesion-supervisor" className="text-blue-500">Iniciar</Link></li>
          <li><Link to="/portalsupervisor" className="text-blue-500">Subir Evaluación</Link></li>
        </ul>
      </div>
    </div>
  );
};

export { DemoPage };
