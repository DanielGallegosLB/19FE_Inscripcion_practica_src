/*
el usuario debe tener sesion iniciada
Usuario puede subir informe de práctica
Usuario puede actualizar informe de práctica
Usuario puede eliminar informe de práctica
Usuario puede ver informe de práctica
informe de práctica es guardado en /informes 
informe es guardado con nombre y id de usuario y fecha de subida 
*/

import React, { Fragment,useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../hooks/useAuth';
import { API } from "./../apiSelection";
import { NavbarPortalAlumno } from "./NavbarPortalAlumno";

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

function SubirInforme() {
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [actualizarInforme, setActualizarInforme] = useState(false);
  const [informe, setInforme] = useState([]);

  const fecha = new Date(informe.FECHA);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; 
  const año = fecha.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${año}`;


  let navigate = useNavigate();


  useEffect(() => {
    if (!auth.rut) {
      navigate('/iniciar-sesion');
    } else {
      getFilesFromUser();
    }

  }, [auth, actualizarInforme]);

  const formData = new FormData();
  formData.append('archivo', file);


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
      const fileRef = ref(storage, `informes/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // Obtener el nombre del archivo
      const fileName = file.name;
      let userRut = auth.rut;
      console.log("userRut: " + userRut)



      // Subir el enlace y el nombre del archivo al usuario usando la API correspondiente
      const response = await fetch(API + `/usuarios/subirInformePorRut/${userRut}`, {
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
        throw new Error(`Error al subir el informe al usuario. Código: ${response.status}`);
      }
      setActualizarInforme(prevState => !prevState)

      console.log('Informe subido exitosamente al usuario.');
    } catch (error) {
      console.error('Error al subir el informe:', error.message);
    }
  };
  async function handleFileDelete() {
    try {
      // Obtener el rut del usuario actual desde auth
      const userRut = auth.rut;

      // Obtener la información del usuario para obtener el nombre del archivo
      const responseUserInfo = await fetch(`${API}/usuarios/obtenerUsuarioPorRut/${userRut}`);
      const userInfo = await responseUserInfo.json();

      if (!responseUserInfo.ok) {
        throw new Error(`Error al obtener información del usuario. Código: ${responseUserInfo.status}`);
      }

      const fileName = userInfo.INFORME ? userInfo.INFORME.FILENAME : null;

      if (!fileName) {
        console.log('El usuario no tiene un informe adjunto.');
        return;
      }

      // Eliminar el archivo de Firebase Storage
      try {
        const fileRef = ref(storage, `informes/${fileName}`);
        await deleteObject(fileRef);
      } catch (error) {
        console.error('Error al eliminar el archivo de firebase:', error.message);
      }
     

      // Llamar a la API para eliminar el informe del usuario
      const response = await fetch(`${API}/usuarios/eliminarInformePorRut/${userRut}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar el informe del usuario. Código: ${response.status}`);
      }

      console.log('Informe y archivo eliminados exitosamente del usuario.');
      setActualizarInforme(prevState => !prevState)
    } catch (error) {
      console.error('Error al eliminar el informe y archivo:', error.message);
    }
  }





  const getFilesFromUser = async () => {
    const rut = auth.rut; // Supongo que el rut del usuario está disponible en auth
    try {

      const response = await fetch(API + `/usuarios/obtenerInformePorRut/${rut}`, {
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
          setInforme(data);
        }

      } else if (response.status === 404) {
        // Manejar el caso en el que no se encuentra el informe
        console.log('Informe no encontrado para el usuario con rut:', rut);
        setFile(null); // Puedes establecer null o manejarlo de acuerdo a tus necesidades
      } else {
        throw new Error('Error al obtener el informe del usuario');
      }
    } catch (error) {
      console.error(error.message);
    }
  };





  return (
    <Fragment>
      <NavbarPortalAlumno />
      <div className="content">
      <Button variant="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
      <h1>Subir informe de práctica</h1>

      <div>
        <h2>Informes</h2>
        {informe.FILENAME ? ( // Verificamos si informe existe antes de intentar mostrarlo
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
                <td>{informe.FILENAME}</td>
                <td>{fechaFormateada}</td>
                <td>
                  <a href={informe.LINK} download>
                    <button>Descargar</button>
                  </a>
                </td>
                <td>
                  <button onClick={() => handleFileDelete()}>
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>No se ha guardado un informe</p>
        )}
      </div>

      <h2>Subir Informe</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Subir informe</button>
      </div>
      </div>
    </Fragment>
  );
}

export { SubirInforme };
