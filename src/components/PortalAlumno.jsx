import React, { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { NavbarPortalAlumno } from "./NavbarPortalAlumno";

function PortalAlumno() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.rut) {
          navigate("/iniciar-sesion");
          return;
        }
        // Puedes realizar acciones adicionales según sea necesario
      } catch (error) {
        console.error('Error durante la carga de datos:', error);
      }
    };
    fetchData();
  }, [auth.rut, navigate]);

  return (
    <Fragment>
      <NavbarPortalAlumno />
      <div className="content">
        <h1>Bienvenido al Portal del Alumno</h1>
        {/* Contenido específico del portal del alumno */}
      </div>
    </Fragment>
  );
}

export { PortalAlumno };
