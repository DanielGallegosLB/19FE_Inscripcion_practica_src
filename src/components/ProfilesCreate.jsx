import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "./../apiSelection";

function ProfilesCreate() {
  const [nombrePerfil, setNombrePerfil] = useState("");
  const [permisos, setPermisos] = useState({
    IP_1: false,
    IP_2: false,
    IP_3: false,
    IP_4: false,
    IP_5: false,
    IP_6: false,
    IP_7: false,
    IP_8: false,
    IP_9: false,
    IP_10: false,
    IP_11: false,
    IP_12: false,
    IP_13: false,
    IP_14: false,
    IP_15: false,
    IP_16: false,
    IP_17: false,
  });

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

  let history = useNavigate();

  const togglePermiso = (permiso) => {
    setPermisos((prevPermisos) => ({
      ...prevPermisos,
      [permiso]: !prevPermisos[permiso],
    }));
  };

  const handleCrearPerfil = async () => {
    try {
      const requestBody = {
        NOMBRE: nombrePerfil,
        IP_1: permisos.IP_1,
        IP_2: permisos.IP_2,
        IP_3: permisos.IP_3,
        IP_4: permisos.IP_4,
        IP_5: permisos.IP_5,
        IP_6: permisos.IP_6,
        IP_7: permisos.IP_7,
        IP_8: permisos.IP_8,
        IP_9: permisos.IP_9,
        IP_10: permisos.IP_10,
        IP_11: permisos.IP_11,
        IP_12: permisos.IP_12,
        IP_13: permisos.IP_13,
        IP_14: permisos.IP_14,
        IP_15: permisos.IP_15,
        IP_16: permisos.IP_16,
        IP_17: permisos.IP_17,
      };
  
      const response = await fetch(API + "/perfiles/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        console.log("Perfil creado exitosamente", data);
        history("/manageprofiles");
      } else {
        console.error("Error al crear el perfil", data);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  

  return (
    <div style={{ margin: "7rem" }}>
      <h1>Crear Perfil</h1>
      <Form>
        <Form.Group className="mb-3" controlId="nombrePerfil">
          <Form.Label>Nombre del Perfil</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre del perfil"
            required
            onChange={(e) => setNombrePerfil(e.target.value)}
          />
        </Form.Group>

        <h2>Permisos</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Permiso</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(permisos).map((permiso, index) => {
              const moduloNombre = moduloNombres[permiso];
              if (moduloNombre) {
                return (
                  <tr key={index}>
                    <td>{moduloNombre}</td>
                    <td onClick={() => togglePermiso(permiso)}>
                      {permisos[permiso] ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}
                    </td>
                  </tr>
                );
              } else {
                // Si no hay nombre de módulo, devuelve una fila vacía
                return <tr key={index}></tr>;
              }
            })}
          </tbody>
        </Table>

        <Link to={"/manageprofiles"}>
          <Button variant="secondary">Cancelar</Button>
        </Link>{" "}
        <Button variant="primary" onClick={handleCrearPerfil}>
          Crear Perfil
        </Button>
      </Form>
    </div>
  );
}

export { ProfilesCreate };
