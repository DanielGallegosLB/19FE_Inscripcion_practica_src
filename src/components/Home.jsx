import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
const API = "http://localhost:3001"
//const API = "https://19-backend.danielgallegosw.repl.co"
//const API = "https://one9backend.onrender.com"

function Home() {
    let history = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async () => {
        try {
            const response = await fetch(API+'/usuarios/obtener-usuarios'); // Ruta para obtener usuarios
            const data = await response.json();
            setUsuarios(data.usuarios);
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const handleEdit = (id, name, password, roles) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("password", password);
        localStorage.setItem("roles", roles);
        history("/edit")
    }

    const handleDelete = async (id) => {
        // Realizar la solicitud DELETE al servidor
        try {
          const response = await fetch(API+`/usuarios/eliminar-usuario/${id}`, {
            method: 'DELETE',
          });
      
          if (response.status === 200) {
            console.log('Usuario eliminado exitosamente');
            // Vuelve a cargar la lista de usuarios después de eliminar uno
            getUsuarios();
          } else {
            console.error('Error al eliminar el usuario');
            console.log(response);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      }
      
    return (
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/cargaralumnos">
            <button>Cargar Alumnos</button>
          </Link>
          <Link to="/cursos">
            <button>Cursos</button>
          </Link>
          <Link to="/formatos">
            <button>Crear Formato</button>
          </Link>
          <Link to="/formalumnos">
            <button>Llenar formulario alumno</button>
          </Link>
          <Link to="/iniciar-sesion">
            <button>Iniciar Sesion</button>
          </Link>
          <Link to="/manageprofiles">
            <button>Manage Profiles</button>
          </Link>
        </div>
    );
}

export { Home , API};