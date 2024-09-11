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
import firebaseConfig from '../../config';

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
