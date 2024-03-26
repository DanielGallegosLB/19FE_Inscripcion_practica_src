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

const firebaseConfig = {
  "type": "service_account",
  "project_id": "ipractica",
  "private_key_id": "a308b060f3013c19dce001be9e7a9474fe76f480",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1R/mbzxcBe/Ic\nylEWy7yVZkAi+00CGzy5meZ5BDiYwO4lqu6J+WhiyJvhy56dKJrVwjx8TA1Yqztd\nUNWJOR2e0qpCpxYxEQ6qraWMWTB2GfJkBzVw0564HhiWouOr6cvdk+l78u/Mmw2w\nX/Krl6bETjRHqargH5p9ph3lMCiDHWKs8q7h2rGgqyXOB+ezRrq7F8IsLxpHhHBc\nwwe4vxPs626WjVAclGEmvAt5fWz9zv+md/Wvq2zU34s2qDTD4OvaDF3U33kLMmtP\nyUD2rvMWjsTRIHzmXHBV2eRxM5GvT8ShWN/1qaZfRSUCumn1FLL/JDTt2VxXMo/G\nKlYbyFbVAgMBAAECggEABE/nD1SrIvb6bHP5GiFAr+eMcmYdI5mwG6NZY/h3u99j\nmZZlAFpGlJ4LJzTqINFbhiHchikA9mxf/jRpRNlHuqILmxH4kLRhyCmSMIrGlHxL\nrDb91kjDnZwJqWMHdTuRtghdm3JDKHeQ9/J1QUsMgKOGDP26NNOGs49dtSTdz19Z\nKsNIBl9GHnvlbFPt3t3t0kCKNSB8FbPAG0+Omu/1FD0AtpAVOMeUq4yMDb7YVW1D\nehDGAMYuj5KwQBr2fLRl9uhl2tWBUuIQoOMZk6J/hQ8PqG1hLZ+l0sGyB/b/UTzd\nXmFISMTSHdUcUdo6utAwVqam8SVgLgoo+HqhN9HNmQKBgQDbl8yS1YT+BnWOdV7E\nYMQPJK22/n64TTrcExmiueFJ7N3ciIxEi6iDRqFgilshz5g9AdjoDf7v4gUQlSW6\nUoIGw9XgLgCtnTEZzCgxi0QZXNCTxvqSnoBuyYDmdJ/UViT97oZnMwxguFWYsKvY\n2HxOspiuod5eeY1xzcoGt47EDwKBgQDTVhrQQzjlT6ceF8m/GHyYToEPOZNh/14G\nIT53QYv00NiwNyebrozwb44qA7PtdP5zOOE70AcxptS/cir3tK4dKRN53K/HGKmo\nI78Sz4a6rE7jFUvGXg6f9nwhnTaonlXT1WCfyOANDfZ++X4DAeRZK9ei0+YolQfv\newgJdnmC2wKBgQDbiu66tsKZ/fc2EF5I073wrekHlXU36e647Feq+1AkSq6dt98V\nANPfO5RIIstuCFDaXahwiN2jE0OhCpyHpcnd3ZlM4nFHImtesWBV+DiDauoVdNA8\nGj+pg8hdn6fT8LRXNEwnjUAIywK4/5kv2XCedax0m9zoc3pYlzgucwJHPQKBgQCJ\n+YZKAAlOVQGTeQ5jL7ZwrZg++2UIrvOQ5vVkYKviKtO9wFSgpIYpl3tmXMKEvkQ9\nr54FMdzwgq4VS5FX5WNjcGThw74TKzvgpW3i9xBMIaDjSw0Mtm2v6/nA7GY6Eh2Q\nzpdl2nzEqSAMaBDoH70YprIDAXsbdakXpehqXSoZzwKBgQCi8nMWE2c1KNpI8tp5\nBNlCtrEGoZ6zJ2N3km8pEr9N3xHRhVCEUi/UxFBZUNiBGwMCErdJCn5AY34knenY\ni2ijhFYaB5sUzbz1dJF4/Yy2F5p62qbiOcctB3mz+nb+780S8QtB9j2TbRUy2qaE\nA0Xq8JUK6Hp2AXbJFrHEGHg8aw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5jbxr@ipractica.iam.gserviceaccount.com",
  "client_id": "113033711376671019358",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5jbxr%40ipractica.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
  "storageBucket": "ipractica.appspot.com",
};

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
