import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "./../apiSelection";
import { NavbarPortalAdmin } from "./NavbarPortalAdmin.jsx";

function ManageProfiles() {
  let history = useNavigate();
  const [perfiles, setPerfiles] = useState([]);

  const moduloNombres = {
    IP_1: "CRUD Usuarios",
    IP_2: "CRUD Cursos",
    IP_3: "SUBIR DOCUMENTACIÓN",
    IP_4: "ADMINISTRAR PERMISOS",
    IP_5: "INICIAR SESIÓN",
    IP_6: "CONSULTAR INSCRIPCIONES",
    IP_7: "CARGAR ALUMNOS",
    IP_8: "EVALUAR INFORME",
    IP_9: "SOLICITAR EVALUACIÓN A SUPERVISORES",
    IP_10: "LLENAR FORMULARIO ALUMNO",
    IP_11: "CONSULTAR FORMATOS",
    IP_13: "SUBIR INFORME",
    IP_14: "CONSULTAR EVALUACIONES",
    IP_16: "SUBIR EVALUACIÓN SUPERVISOR",
  };

  const getPerfiles = async () => {
    try {
      const response = await fetch(API + '/perfiles/obtener', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  useEffect(() => {
    getPerfiles();
  }, []);



  const togglePermiso = async (nombrePerfil, permiso, valor) => {
    try {
      const requestBody = {
        [permiso]: valor,
      };

      const response = await fetch(API + `/perfiles/editar/${nombrePerfil}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        // Actualizar la lista de perfiles después de editar uno
        getPerfiles();
      } else {
        console.error('Error al editar el perfil');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleDelete = async (nombrePerfil) => {
    // Realizar la solicitud DELETE al servidor
    try {
      const response = await fetch(API + `/perfiles/eliminar/${nombrePerfil}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Perfil eliminado exitosamente');
        // Vuelve a cargar la lista de perfiles después de eliminar uno
        getPerfiles();
      } else {
        console.error('Error al eliminar el perfil');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  return (
    <Fragment>
      <NavbarPortalAdmin />
      <div>
        <h1>Perfiles</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Módulos</th>
              {perfiles?.map((perfil, index) => (
                <th key={index}>
                  {perfil.NOMBRE}
                  <Button variant="danger" onClick={() => handleDelete(perfil.NOMBRE)}>
                    Eliminar
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
                        <td key={indexPerfil} onClick={() => togglePermiso(perfil.NOMBRE, permiso, !perfil[permiso])}>
                          {perfil[permiso] ? (
                            <FontAwesomeIcon icon={faCheck} />
                          ) : (
                            <FontAwesomeIcon icon={faTimes} />
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                } else {
                  // Si no hay nombre de módulo, devuelve una fila vacía
                  return <tr key={permisoIndex}></tr>;
                }
              }
              return null; // Omitir propiedades que no son permisos
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

