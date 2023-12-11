import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { API } from "./../apiSelection";
import { NavbarPortalProfesor } from "./NavbarPortalProfesor";

function PortalProfesor() {
  const { auth } = useAuth();
  const [curso, setCurso] = useState([]);
    const [rutprofesor, setRutprofesor] = useState('');

  const navigate = useNavigate();

  const showCourse = async (id, user, perfil) => {
    try {
      const response = await fetch(
        API+"/cursos/obtener-cursos"
      ); // Ruta para obtener usuarios
      const data = await response.json();
      console.log(data);
      if (data.cursos.length > 0) {
        console.log(data.cursos[0].nombre);
        localStorage.setItem("id", data.cursos[0]._id);
        localStorage.setItem("name", data.cursos[0].nombre);
        localStorage.setItem("profesor", data.cursos[0].profesor);
        localStorage.setItem("alumnos", data.cursos[0].alumnos);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  const getRutprofesor = async () => {
  try {
      const response = await fetch(API + `/usuarios/obtener-usuario/${auth.id}`);
      
      const data = await response.json();
      if (data.RUT) {
        setRutprofesor(data.RUT);
        console.log("GET rut: "+data.RUT)
        console.log("GET rutprofesor: "+rutprofesor)
    } else {
        console.error('La propiedad "usuario" está ausente en la respuesta.');
    }

      
  } catch (error) {
      console.error('Error de red:', error);
  }
}




const getCurso = async () =>{
    try {
      const response = await fetch(API + `/cursos/obtener-por-rutprofesor/${rutprofesor}`); 
      const data = await response.json();
      setCurso(data.curso);
      console.log("GET cursos: "+data.curso)
  } catch (error) {
      console.error('Error de red:', error);
  }
}

useEffect(() => {
  const fetchData = async () => {
      try {
          if (!auth.user) {
              navigate("/iniciar-sesion");
              return;
          }

          await getRutprofesor(); 

          
          await getCurso();
      } catch (error) {
          console.error('Error durante la carga de datos:', error);
      }
  };

  fetchData(); // Llama a la función fetchData al montar el componente
}, [auth.user]);

useEffect(() => {
  console.log("GET rutprofesor en nuevo useEffect: " + rutprofesor);
}, [rutprofesor]);

  
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