import React, { Fragment,useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./../apiSelection";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { NavbarPortalAdmin } from "./NavbarPortalAdmin.jsx";
import firebaseConfig from "./../../config.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function CargarFormatos() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]); // [file1, file2, ...
  const [downloadURLs, setDownloadURLs] = useState(null); // [url1, url2, ...
  const formData = new FormData();
  formData.append('archivo', file);

  let history = useNavigate();

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
    const fileRef = ref(storage, 'formatos/' + file.name);
    await uploadBytes(fileRef, file);
    if (fileRef) {
      alert('Archivo subido correctamente.');
    }
    getFiles();
  };

  async function handleFileDelete(fileRef) {
    if (!fileRef) {
      alert('Por favor, seleccione un archivo válido.');
      return;
    }

    try {
      await deleteObject(fileRef);
      alert('Archivo eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      alert('Error al eliminar el archivo.');
    }
    getFiles();
  }

  const obtenerDownloadURLs = async () => {
    const downloadURLPromises = files.map(async (file) => {
      const fileRef = ref(storage, 'formatos/' + file);
      return await getDownloadURL(fileRef);
    });

    const urls = await Promise.all(downloadURLPromises);
    setDownloadURLs(urls);
  };
  const getFiles = async () => {
    const files = await listAll(ref(storage, 'formatos'));
    const fileNames = files.items.map((file) => file.name);
    setFiles(fileNames);
  };

  useEffect(() => { 
    getFiles();
    obtenerDownloadURLs();
  }, []);



  return (
    <Fragment>
      <NavbarPortalAdmin />
      <h1>Manejar documentación general</h1>
      <div>
        <h2>Archivos</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descargar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => {
              const fileRef = ref(storage, 'formatos/' + file); // Crea la referencia del archivo
              return (
                <tr key={index}>
                  <td>{file}</td>
                  <td>
                    <a href={downloadURLs[index]} download>
                      <button>Descargar</button>
                    </a>
                  </td>
                  <td>
                    <button onClick={() => handleFileDelete(fileRef)}>Eliminar</button> {/* Pasa la referencia a la función */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>


      </div>
      <h2>Subir Archivo</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Subir archivo</button>
      </div>

    </Fragment>
  );
}

export { CargarFormatos };