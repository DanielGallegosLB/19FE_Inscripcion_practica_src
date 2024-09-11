import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./../apiSelection";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { NavbarPortalAlumno } from "./NavbarPortalAlumno";
import firebaseConfig from '../../config';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function DescargarFormatos() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]); // [file1, file2, ...
  const [downloadURLs, setDownloadURLs] = useState(null); // [url1, url2, ...

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const files = await listAll(ref(storage, 'formatos'));
        const fileNames = files.items.map((file) => file.name);
        setFiles(fileNames);

        const downloadURLPromises = fileNames.map(async (file) => {
          const fileRef = ref(storage, 'formatos/' + file);
          return await getDownloadURL(fileRef);
        });

        const urls = await Promise.all(downloadURLPromises);
        setDownloadURLs(urls);
      } catch (error) {
        console.error('Error al obtener los URLs de descarga:', error);
        // Manejo de errores si es necesario
      }
    };

    obtenerDatos();
  }, []);




  return (
    <Fragment>
      <NavbarPortalAlumno />
      <div className="container">
        <h1>Documentación general</h1>
        <h2>Archivos</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descargar</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file}</td>
                <td>
                  {downloadURLs && downloadURLs[index] ? (
                    <a href={downloadURLs[index]} download>
                      <button>Descargar</button>
                    </a>
                  ) : (
                    <span>Cargando URL de descarga...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}
export { DescargarFormatos };
