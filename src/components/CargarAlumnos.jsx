import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
import { API } from "./../apiSelection";
import { useAuth } from "../hooks/useAuth";


function CargarAlumnos() {
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
  const [curso, setCurso] = useState(null);
  const [actualizarCurso, setActualizarCurso] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.user) {
      navigate('/iniciar-sesion');
    } else {
      // Aquí puedes realizar la solicitud al servidor para obtener la información del curso

      fetch(API + '/cursos/obtener-por-rutprofesor/' + auth.rut)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener el curso del profesor');
          }
        })
        .then(data => {
          setCurso(data);  // Almacena la información del curso en el estado
        })
        .catch(error => {
          console.error('Error de red:', error);
          alert('Error al obtener el curso del profesor');
        });
    }
  }, [auth.user, navigate, actualizarCurso]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target.result;
        const lines = contents.split('\n');
        const data = [];

        for (let i = 0; i < lines.length; i++) {
          const row = lines[i].split(',');
          data.push(row);
        }

        setCsvData(data);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('archivo', file); // Cambiar 'file' por el nombre del archivo que estás manejando

      const response = await fetch(`/subir-csv/${curso.curso._id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Datos guardados correctamente en la base de datos.');
        // Recargar la información del curso después de agregar alumnos
        fetch(`/cursos/obtener-por-rutprofesor/${auth.rut}`)
          .then(response => response.json())
          .then(data => setCurso(data))
          .catch(error => {
            console.error('Error al recargar el curso:', error);
          });
      } else if (response.status === 404) {
        const errorResponse = await response.json();
        alert(`Error 404: ${errorResponse.error}`);
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al enviar la solicitud.');
    }
  };



  const handleEliminarAlumno = async (idCurso, rutAlumno) => {
    try {
      const response = await fetch(API + `/cursos/eliminar-alumno/${idCurso}/${rutAlumno}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        
        // Actualizamos el estado para desencadenar la recarga del curso
        setActualizarCurso(prevState => !prevState);
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al enviar la solicitud.');
    }
  };

  return (
    <div className="container my-4">
      {curso && curso.curso && (
        <div>
          <div className="d-sm-block">
            <p><strong>Nombre:</strong> {curso.curso.NOMBRE}</p>
            <p><strong>Profesor:</strong> {curso.curso.PROFESOR}</p>
            <p><strong>Rut del Profesor:</strong> {curso.curso.RUTPROFESOR}</p>
            <p><strong>NRC:</strong> {curso.curso.NRC}</p>
            <p><strong>ACI:</strong> {curso.curso.ACI}</p>
            <p><strong>Periodo:</strong> {curso.curso.PERIODO}</p>
          </div>
          <h3>Lista de Alumnos:</h3>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>RUT</th>
                <th>Fecha de Nacimiento</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Facultad</th>
                <th>Escuela</th>
                <th>Carrera</th>
                <th>Régimen</th>
                <th>Sede</th>
                <th>Perfil</th>
                <th>NRC</th>
                <th>ACI</th>
                <th>Periodo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {curso.curso.ALUMNOS?.map((alumno, index) => (
                <tr key={index}>
                  <td>{alumno.NOMBRES}</td>
                  <td>{alumno.APELLIDO_PATERNO}</td>
                  <td>{alumno.APELLIDO_MATERNO}</td>
                  <td>{alumno.RUT}</td>
                  <td>{alumno.FECHA_DE_NACIMIENTO}</td>
                  <td>{alumno.TELÉFONO}</td>
                  <td>{alumno.CORREO}</td>
                  <td>{alumno.FACULTAD}</td>
                  <td>{alumno.ESCUELA}</td>
                  <td>{alumno.CARRERA}</td>
                  <td>{alumno.REGÍMEN}</td>
                  <td>{alumno.SEDE}</td>
                  <td>{alumno.PERFIL.join(', ')}</td>
                  <td>{alumno.NRC}</td>
                  <td>{alumno.ACI}</td>
                  <td>{alumno.PERIODO}</td>
                  <td>
                    <button onClick={() => handleEliminarAlumno(curso.curso._id, alumno.RUT)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <h1>Subir Archivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Subir</button>
    </div>
  );
}

export { CargarAlumnos };