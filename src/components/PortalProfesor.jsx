import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { NavbarPortalProfesor } from "./NavbarPortalProfesor";

function PortalProfesor() {
  const { auth } = useAuth();
  const [rutprofesor, setRutprofesor] = useState('');
  

  const navigate = useNavigate();


useEffect(() => { 
  //console.log("useeffectGET rutprofesor: " + rutprofesor);
  const fetchData =  async () => {
      try {
          if (!auth.rut) {
              navigate("/iniciar-sesion");
              return;
          }
      } catch (error) {
          console.error('Error durante la carga de datos:', error);
      }
  };
  fetchData()
}, []);

    return (
      <div>
       <NavbarPortalProfesor />
        <div className="content">
          <h1>Bienvenido al Portal del Profesor</h1>
          {/* Contenido específico del portal del profesor */}
        </div>
      </div>
    );
  }

export { PortalProfesor };