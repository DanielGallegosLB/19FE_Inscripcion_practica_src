import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API } from "./../apiSelection";
import { NavbarPortalAdmin } from "./NavbarPortalAdmin.jsx";

function ManageProfiles() {
  let history = useNavigate();
  const [perfiles, setPerfiles] = useState([]);

  const moduloNombres = {
    IP_1: "CRUD Usuarios",
    IP_2: "CRUD Cursos",
    IP_3: "Subir Documentación",
    IP_4: "Administrar Permisos",
    IP_5: "Iniciar Sesión",
    IP_6: "Consultar Inscripciones",
    IP_7: "Cargar Alumnos",
    IP_8: "Evaluar Informe",
    IP_9: "Solicitar Evaluación a Supervisores",
    IP_10: "Llenar Formulario Alumno",
    IP_11: "Consultar Formatos",
    IP_13: "Subir Informe",
    IP_14: "Consultar Evaluaciones",
    IP_16: "Subir Evaluación Supervisor",
  };

  const getPerfiles = async () => {
    try {
      const response = await fetch(API + "/perfiles/obtener", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    getPerfiles();
  }, []);

  const togglePermiso = async (nombrePerfil, permiso, valor) => {
    try {
      const requestBody = {
        [permiso]: valor,
      };

      const response = await fetch(API + `/perfiles/editar/${nombrePerfil}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        getPerfiles();
      } else {
        console.error("Error al editar el perfil");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleDelete = async (nombrePerfil) => {
    try {
      const response = await fetch(API + `/perfiles/eliminar/${nombrePerfil}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        console.log("Perfil eliminado exitosamente");
        getPerfiles();
      } else {
        console.error("Error al eliminar el perfil");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <Fragment>
      <NavbarPortalAdmin />
      <div className="container mt-4 p-4 bg-light rounded border">
        <h1 className="mb-4">Perfiles</h1>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>Módulos</th>
              {perfiles?.map((perfil, index) => (
                <th key={index} className="text-center">
                  {perfil.NOMBRE}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(perfil.NOMBRE)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(perfiles[0] || {}).map((permiso, permisoIndex) => {
              if (permiso.startsWith("IP_")) {
                const moduloNombre = moduloNombres[permiso];
                if (moduloNombre) {
                  return (
                    <tr key={permisoIndex}>
                      <td>{moduloNombre}</td>
                      {perfiles?.map((perfil, indexPerfil) => (
                        <td
                          key={indexPerfil}
                          className="text-center"
                          onClick={() => togglePermiso(perfil.NOMBRE, permiso, !perfil[permiso])}
                          style={{ cursor: "pointer" }}
                        >
                          {perfil[permiso] ? (
                            <FontAwesomeIcon icon={faCheck} className="text-success" />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} className="text-danger" />
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                } else {
                  return <tr key={permisoIndex}></tr>;
                }
              }
              return null;
            })}
          </tbody>
        </Table>

        <Link className="d-grid gap-2" to="/manageprofiles/create">
          <Button size="lg">Crear</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export { ManageProfiles };
