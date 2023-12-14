import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { NavbarPortalAdmin } from "./NavbarPortalAdmin.jsx";

function PortalAdmin() {
  return (
    <div>
      <NavbarPortalAdmin />
      <div className="content">
        <h1>Bienvenido al Portal del Administrador</h1>
        {/* Contenido específico del portal del administrador */}
      </div>
    </div>
  );
}

export { PortalAdmin };