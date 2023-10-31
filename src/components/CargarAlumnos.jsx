import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./../apiSelection";


function CargarAlumnos() {
    const [csvData, setCsvData] = useState([]);
    const [file, setFile] = useState(null);
    const formData = new FormData();
    formData.append('archivo', file);

    let history = useNavigate();

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
        if (!file) {
          alert('Por favor, seleccione un archivo CSV.');
          return;
        }
        const formData = new FormData();
        formData.append('archivo', file);

        try {
          const response = await fetch(API+'/alumnos/subir-csv', {
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
        <h1>Subir Archivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Subir</button>

      {csvData.length > 0 && (
        <div>
          <h2>Contenido del archivo CSV:</h2>
          <table>
            <thead>
              <tr>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
   </div>
);
}

export { CargarAlumnos };