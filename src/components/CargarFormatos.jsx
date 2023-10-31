import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./../apiSelection";


function CargarFormatos() {
    const [file, setFile] = useState(null);
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
        const formData = new FormData();
        formData.append('archivo', file);

        try {
          const response = await fetch(API+'/formatos/subir-formato', {
            method: 'POST',
            body: formData,
          });
          
          if (response.status === 200) {
            alert('Datos guardados correctamente en la base de datos.');
          } else {
            const errorResponse = await response.json(); // Obtiene el mensaje de error del servidor como un objeto JSON
            alert(`Error: ${errorResponse.error}`);
          }
        } catch (error) {
          console.error('Error de red:', error);
          alert('Error de red al enviar la solicitud.');
        }
      };



return (
    <div>
        <h1>Documentación general</h1>
        <h2>Archivos</h2>
        <h2>Subir Archivo</h2>
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Subir archivo</button>
        </div>
   </div>
);
}

export { CargarFormatos };