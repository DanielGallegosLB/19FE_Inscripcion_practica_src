/*
el usuario debe tener sesion iniciada
Usuario puede subir informe de práctica
Usuario puede actualizar informe de práctica
Usuario puede eliminar informe de práctica
Usuario puede ver informe de práctica
informe de práctica es guardado en /informes 
informe es guardado con nombre y id de usuario y fecha de subida 
*/

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../hooks/useAuth';
import { API } from "./../apiSelection";

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
  const [files, setFiles] = useState([]); // [file1, file2, ...
  const [downloadURLs, setDownloadURLs] = useState(null); // [url1, url2, ...
  const [informe, setInforme] = useState([]);

  useEffect(() => {
    
    if (!auth.user)
      navigate('/iniciar-sesion');
    getFilesFromUser();

  }, [auth, history]);

  const formData = new FormData();
  formData.append('archivo', file);

  let navigate = useNavigate();

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

    const fileRef = ref(storage, `informes/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    guardarInformeEnAPI(auth.user, auth.id, file.name, url, new Date().toISOString());

    
    
  };

  async function handleFileDelete(fileRef) {
    if (!fileRef) {
      alert('Por favor, seleccione un archivo válido.');
      return;
    }

    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error eliminar informe:', error);
    }

    try {
      const response = await fetch(API + `/informes/eliminar/${auth.id}`, {
        method: 'POST',
      });

      if (response.status === 200) {
        console.log('Informe eliminado exitosamente');
        alert('Informe eliminado exitosamente');

      } else {
        throw new Error('Error al eliminar el informe');
      }
    } catch (error) {
      console.error('Error eliminar registro informe:', error);
    }

    getFilesFromUser();
  }

  const obtenerDownloadURLs = async () => {
    const downloadURLPromises = files.map(async (file) => {
      const fileRef = ref(storage, `informes/${file}`);

      return await getDownloadURL(fileRef);
    });



    const urls = await Promise.all(downloadURLPromises);
    setDownloadURLs(urls);
  };

  const getFiles = async () => {
    const files = await listAll(ref(storage, 'informes'));
    const fileNames = files.items.map((file) => file.name);
    setFiles(fileNames);
  };

  const getFilesFromUser = async () => {
    const id = auth.id;

    try {
      const response = await fetch(API + `/informes/obtener/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const informe = await response.json();
        setInforme(informe);
      } else if (response.status === 404) {
        setInforme([]);
      } else {
        throw new Error('Error al obtener los informes del usuario');

      }


    } catch (error) {
      console.error(error.message);
    }
  };



  const guardarInformeEnAPI = async (usuario, id, nombre, linkDescarga) => {
    try {
      const response = await fetch(`${API}/informes/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          id,
          nombre,
          linkDescarga,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar informe en la API");
      }
      if (response.status === 200) {
        alert("Informe actualizado exitosamente");
        getFilesFromUser();
      }
      if (response.status === 201) {
        alert("Informe creado exitosamente");
        getFilesFromUser();
      }

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Volver
      </Button>
      <h1>Subir informe de práctica</h1>

      <div>
        <h2>Informes</h2>
        {informe.nombre ? ( // Verificamos si informe existe antes de intentar mostrarlo
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
                <td>{informe.nombre}</td>
                <td>{informe.fechaSubida}</td>
                <td>
                  <a href={informe.linkDescarga} download>
                    <button>Descargar</button>
                  </a>
                </td>
                <td>
                  <button onClick={() => handleFileDelete(ref(storage, `informes/${informe.nombre}`))}>
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
  );
}

export { SubirInforme };
