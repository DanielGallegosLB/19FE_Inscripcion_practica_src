import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../hooks/useAuth';
import { API } from "./../apiSelection";
import { NavbarPortalSupervisor } from "./NavbarPortalSupervisor";
import { set } from 'mongoose';
import firebaseConfig from '../../config';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function PortalSupervisor() {
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [actualizarInforme, setActualizarInforme] = useState(false);
  const [evaluacion, setEvaluacion] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();
  const [nota, setNota] = useState("")

  const fecha = new Date(evaluacion.FECHA);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${año}`;

  useEffect(() => {
    //if (!auth.correo) {
    //  navigate("/iniciar-sesion-supervisor");
    //}
    getFilesFromUser();
  }, [auth, actualizarInforme]);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Por favor, seleccione un archivo.');
      return;
    }

    try {
      // Subir el archivo a Firebase Storage
      const fileRef = ref(storage, `evaluacionesSupervisor/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // Obtener el nombre del archivo
      const fileName = file.name;
      let correo = auth.correo;

      // Subir el enlace y el nombre del archivo al supervisor usando la API correspondiente
      const response = await fetch(API + `/supervisores/subirEvaluacionPorCorreo/${correo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LINK: url,
          FILENAME: fileName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al subir la evaluación al supervisor. Código: ${response.status}`);
      }

      console.log('Evaluación subida exitosamente al supervisor.');
      setActualizarInforme(prevState => !prevState)
    } catch (error) {
      console.error('Error al subir la evaluación:', error.message);
    }
  };

  const getFilesFromUser = async () => {
    const correo = auth.correo; // Supongo que el correo del usuario está disponible en auth
    try {
      const response = await fetch(API + `/supervisores/obtener-Evaluacion-con-correo/${correo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data == null) {
          setFile(null);
        } else {
          setEvaluacion(data);
          setNota(data.NOTA);
        }
      } else if (response.status === 404) {
        // Manejar el caso en el que no se encuentra la evaluación
        setFile(null); // Puedes establecer null o manejarlo según tus necesidades
      } else {
        throw new Error('Error al obtener la evaluación del usuario');
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  async function handleFileDelete() {
    try {
      // Obtener el correo del supervisor actual desde auth
      const userCorreo = auth.correo;

      // Obtener la información del supervisor para obtener el nombre del archivo
      const responseSupervisorInfo = await fetch(`${API}/supervisores/obtener-supervisor-por-correo/${userCorreo}`);
      const supervisorInfo = await responseSupervisorInfo.json();

      if (!responseSupervisorInfo.ok) {
        throw new Error(`Error al obtener información del supervisor. Código: ${responseSupervisorInfo.status}`);
      }

      const fileName = supervisorInfo.EVALUACION ? supervisorInfo.EVALUACION.FILENAME : null;

      if (!fileName) {
        console.log('El supervisor no tiene una evaluación adjunta.');
        return;
      }

      // Eliminar el archivo de Firebase Storage
      try {
        const fileRef = ref(storage, `evaluacionesSupervisor/${fileName}`);
        await deleteObject(fileRef);
      } catch (error) {
        console.error('Error al eliminar el archivo de Firebase:', error.message);
      }

      // Llamar a la API para eliminar la evaluación del supervisor
      const response = await fetch(`${API}/supervisores/eliminarEvaluacionPorCorreo/${userCorreo}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar la evaluación del supervisor. Código: ${response.status}`);
      }

      console.log('Evaluación y archivo eliminados exitosamente del supervisor.');
      setActualizarInforme(prevState => !prevState)
      // Agregar aquí cualquier lógica adicional que necesites después de eliminar la evaluación
    } catch (error) {
      console.error('Error al eliminar la evaluación y archivo:', error.message);
    }
  }

  const handleNotaChange = async (nota) => {
    setNota(nota); // Actualizar el estado de la nota
  };

  const calificarEvaluacionConCorreo = async () => {
    try {
      let correo = auth.correo; // Supongo que el correo del usuario está disponible en auth
      // Realizar la solicitud POST para calificar la evaluación
      const response = await fetch(API+`/supervisores/calificarEvaluacionConCorreo/${correo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NOTA: nota }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Manejar el mensaje de éxito del backend
        alert('Evaluación calificada exitosamente');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al calificar la evaluación');
      }
    } catch (error) {
      console.error('Error al calificar la evaluación:', error.message);
    }
  };





  return (
    <Fragment>
      <NavbarPortalSupervisor />
      <div className="content">
        <h2>Subir Evaluación</h2>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Subir Evaluación</button>
        </div>

        <h2>Evaluaciones</h2>
        {evaluacion.FILENAME ? ( // Verificamos si evaluacion existe antes de intentar mostrarlo
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha Subida</th>
                <th>Descargar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{evaluacion.FILENAME}</td>
                <td>{fechaFormateada}</td>
                <td>
                  <a href={evaluacion.LINK} download>
                    <Button>Descargar</Button>
                  </a>
                </td>
                <td>
                  <Button onClick={() => handleFileDelete()}>Eliminar</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>No se ha guardado una evaluación</p>
        )}
        <div>
          <label htmlFor="nota">Nota Final:</label>
          <input
            type="number"
            id="nota"
            name="nota"
            min="1.0"
            max="7.0"
            step="0.1"
            value={nota}
            placeholder="Ingrese la nota final"
            onChange={(e) => handleNotaChange(e.target.value)}
          />
          <button onClick={() => calificarEvaluacionConCorreo(nota)}>Calificar</button>
        </div>
      </div>

    </Fragment>
  );
}

export { PortalSupervisor };
