import React, { useState } from 'react';
import { Home } from './components/Home';
import { CrearUsuario } from './components/CrearUsuario';
import { UsuarioEditar } from './components/UsuarioEditar';
import { CargarAlumnos } from './components/CargarAlumnos';
import { CursosMostrar } from './components/CursosMostrar';
import { CursosEditar } from './components/CursosEditar';
import { CursosCrear } from './components/CursosCrear';
import { CargarFormatos } from './components/CargarFormatos';
import { DescargarFormatos } from './components/DescargarFormatos.jsx';
import { FormAlumnos } from './components/FormAlumnos.jsx';
import { IniciarSesion } from './components/IniciarSesion.jsx';
import { BrowserRouter as Router, Route, Routes, Link,Navigate  } from "react-router-dom";
import { Layout } from './components/Layout';
import { Unauthorized } from './components/Unauthorized';
import { Missing } from './components/Missing.jsx';
import { Registrarse } from './components/Registrarse.jsx';
import { RequireAuth } from './components/RequireAuth';
import { ManageProfiles } from './components/ManageProfiles.jsx';
import { UsersManage } from './components/UsersManage.jsx';
import Navbar from './components/Navbar.jsx';
import { SubirInforme } from './components/SubirInforme.jsx';
import { PortalProfesor } from './components/PortalProfesor.jsx';
import { CursoMostrar } from './components/CursoMostrar.jsx';
import { CursoCrear } from './components/CursoCrear.jsx';
import { PortalAlumno } from './components/PortalAlumno.jsx';
import { PortalSupervisor } from './components/PortalSupervisor.jsx';
import { MiPerfil } from './components/MiPerfil.jsx';
import { ProfilesCreate } from './components/ProfilesCreate.jsx';
import { PortalAdmin } from './components/PortalAdmin.jsx';
import { RegistrarSupervisor } from './components/RegistrarSupervisor.jsx';
import { IniciarSesionSupervisor } from './components/IniciarSesionSupervisor.jsx';
import { LandingPage } from './components/LandingPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* Publicas */}
        <Route index element={<Navigate to="/iniciar-sesion" />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/dev" element={<Home />} />
        <Route path="/registrar-supervisor" element={<RegistrarSupervisor />} />
        <Route path="/iniciar-sesion-supervisor" element={<IniciarSesionSupervisor />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/navbar" element={<Navbar />} />

        {/* Privadas */}
        <Route path="/formatos/manejar" element={<CargarFormatos />} />
        <Route path="/formatos" element={<DescargarFormatos />} />
        <Route path="/manageprofiles" element={<ManageProfiles />} />
        <Route path='/manageprofiles/create' element={<ProfilesCreate />} />
        <Route path='/usersmanage' element={<UsersManage />} />
        <Route path="/create" element={<CrearUsuario />} />
        <Route path="/edit" element={<UsuarioEditar />} />
        <Route path="/cursos" element={<CursosMostrar />} />
        <Route path="/cursos/crear" element={<CursosCrear />} />
        <Route path="/cursos/editar" element={<CursosEditar />} />
        <Route path="/cargaralumnos" element={<CargarAlumnos />} />
        <Route path="/formalumnos" element={<FormAlumnos />} />
        <Route path="/informe" element={<SubirInforme />} />
        <Route path="/portalprofesor" element={<PortalProfesor />} />
        <Route path="/portalprofesor/curso" element={<CursoMostrar />} />
        <Route path="/portalprofesor/curso/crear" element={<CursoCrear />} />
        <Route path="/portalalumno" element={<PortalAlumno />} />
        <Route path="/portalsupervisor" element={<PortalSupervisor />} />
        <Route path="/portaladmin" element={<PortalAdmin />} />
        <Route path="/miperfil" element={<MiPerfil />} />

        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

 {/* Privadas 
        <Route element={<RequireAuth modulo={["IP_1"]} />}>
        <Route path="/manageprofiles" element={<ManageProfiles />} />
        <Route path='/usersmanage' element={<UsersManage />} />
        <Route path="/create" element={<CrearUsuario />} />
        <Route path="/edit" element={<UsuarioEditar />} />
        </Route>

        <Route element={<RequireAuth modulo={["IP_2"]} />}>
        <Route path="/cursos" element={<CursosMostrar />} />
          <Route path="/cursos/crear" element={<CursosCrear />} />
          <Route path="/cursos/editar" element={<CursosEditar />} />
        </Route>

        <Route element={<RequireAuth modulo={["IP_3"]} />}>
          <Route path="/formatos/manejar" element={<CargarFormatos />} />
        </Route>
        
        <Route element={<RequireAuth modulo={["IP_6"]} />}>
        <Route path="/formatos" element={<DescargarFormatos />} />
        </Route>
        <Route element={<RequireAuth modulo={["IP_7"]} />}>
        <Route path="/cargaralumnos" element={<CargarAlumnos />} />
        </Route>
        <Route element={<RequireAuth modulo={["IP_8"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_9"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_10"]} />}>
        <Route path="/formalumnos" element={<FormAlumnos />} />
        </Route>
        <Route element={<RequireAuth modulo={["IP_11"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_12"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_13"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_14"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_15"]} />}>
        </Route>
        <Route element={<RequireAuth modulo={["IP_16"]} />}>
        </Route>
        */}
