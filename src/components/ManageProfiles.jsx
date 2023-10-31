import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "./../apiSelection";

function ManageProfiles() {
  let history = useNavigate();
  const [perfiles, setPerfiles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [permisos, setPermisos] = useState(perfiles.map((perfil) => {
    const permisosFiltrados = Object.keys(perfil)
      .filter(permiso => permiso.startsWith("IP_"))
      .reduce((obj, key) => {
        obj[key] = perfil[key];
        return obj;
      }, {});

    return permisosFiltrados;
  }));


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
    IP_12: "---",
    IP_13: "SUBIR INFORME",
    IP_14: "CONSULTAR EVALUACIONES",
    IP_15: "---",
    IP_16: "SUBIR EVALUACIÓN SUPERVISOR",
    IP_17: "---",
  };





  const getPerfiles = async () => {
    try {
      const response = await fetch(API + '/perfiles/obtener', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      const data = await response.json();
      setPerfiles(data.perfiles);

    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const getUsuarios = async () => {
    try {
      const response = await fetch(API + '/usuarios/obtener-usuarios'); // Ruta para obtener usuarios
      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  getPerfiles();
  useEffect(() => {
    getUsuarios();
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

      } else {

      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  const handleEdit = (id, name, password, perfil) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    localStorage.setItem("perfil", perfil);
    history("/edit")
  }

  const handleDelete = async (id) => {
    // Realizar la solicitud DELETE al servidor
    try {
      const response = await fetch(API + `/usuarios/eliminar-usuario/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Usuario eliminado exitosamente');
        // Vuelve a cargar la lista de usuarios después de eliminar uno
        getPerfiles();
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  return (
    <Fragment>
      <div>
        <h1>Perfiles</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Módulos</th>
              {perfiles?.map((perfil, index) => (
                <th key={index}>{perfil.NOMBRE}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(perfiles[0] || {}).map((permiso, permisoIndex) => {
              if (permiso.startsWith("IP_")) {
                return (
                  <tr key={permisoIndex}>
                    <td>{moduloNombres[permiso]}</td>
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
              }
              return null; // Omitir propiedades que no son permisos
            })}

          </tbody>
        </Table>


        <Link className="d-grid gap-2" to="/create">
          <Button size="lg">Crear</Button>
        </Link>
      </div>




      <div style={{ margin: "1rem" }}>
        <h1>Usuarios</h1>
        <Table striped bordered hover size={"sm"}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Contraseña</th>
              <th>Perfil</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u, index) => (
                <tr key={index}>
                  <td>{u._id}</td>
                  <td>{u.NOMBRES}</td>
                  <td>{u.CONTRASEÑA}</td>
                  <td>{u.PERFIL.join(', ')}</td>
                  <td>
                    <Link to="/edit">
                      <Button onClick={() => handleEdit(u._id, u.NOMBRES, u.CONTRASEÑA, u.PERFIL)}>Editar</Button>
                    </Link>
                    <Button onClick={() => handleDelete(u._id)}>Eliminar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No hay usuarios</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Link className="d-grid gap-2" to="/create">
          <Button size="lg">Crear</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export { ManageProfiles };