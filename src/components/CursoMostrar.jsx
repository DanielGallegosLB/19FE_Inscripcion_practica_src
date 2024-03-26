import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Table, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";
import { useAuth } from "../hooks/useAuth";
import { NavbarPortalProfesor } from "./NavbarPortalProfesor";
import { set } from "mongoose";
import { FaSearch } from "react-icons/fa";


function CursoMostrar() {
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
  const [curso, setCurso] = useState(null);
  const [actualizarCurso, setActualizarCurso] = useState(false);
  const [actualizarInformes, setActualizarInformes] = useState(false);
  const [notaInformes, setNotaInformes] = useState(0);
  const [informes, setInformes] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [rutprofesor, setRutprofesor] = useState('');
  const [rutBusqueda, setRutBusqueda] = useState("");
  const [alumnoEncontrado, setAlumnoEncontrado] = useState(null);
  const [alumnosCoincidentes, setAlumnosCoincidentes] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [results, setResults] = useState([]);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  const getCurso = async () => {
    try {
      const response = await fetch(API + `/cursos/obtener-por-rutprofesor/${rutprofesor ? rutprofesor : auth.rut}`);
      const data = await response.json();
      setCurso(data.curso);
      //setActualizarInformes(prevState => !prevState)
      //console.log("GET cursos: "+data.curso)
      setActualizarInformes(true);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCurso();
      } catch (error) {
        console.error('Error durante la carga de datos:', error);
      }
    };
    fetchData();
  }, [auth.user, actualizarCurso]);

  useEffect(() => {
    if (actualizarInformes) {
      setActualizarInformes(false);
      handleActualizarInformes();
    }
  }, [curso, actualizarInformes]);

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
      formData.append('archivo', file);

      const response = await fetch(API + `/alumnos/subir-csv/${curso._id}`, {
        method: 'POST',
        body: formData,
      });

      getCurso();
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
        alert('Alumno eliminado correctamente.');
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

  const getAlumnos = (rut) => {
    fetch(`${API}/usuarios/obtenerAlumnos`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Hubo un problema con la solicitud.');
        }
        return response.json();
    })
    .then((json) => {
        if (Array.isArray(json)) {
            const results = json.filter((alumno) => {
                return rut && alumno && alumno.RUT && alumno.RUT.includes(rut);
            });
            setResults(results);
        } else {
            console.error('El servidor no devolvió un array JSON.');
        }
    })
    .catch((error) => {
        console.error('Error al obtener alumnos:', error);
    });
};


  const handleSeleccionarAlumno = (alumno) => {
    const rutSeleccionado = alumno.RUT;
    setRutBusqueda(rutSeleccionado)
  };

  

  const handleSearchChange = (value) => {
    setRutBusqueda(value);
    getAlumnos(value);
  }

  /*
  Buscar informe por rut 
  asignar link de descarga a alumno

  Nota informe debe haber un campo de texto para ingresar la nota
  boton calificar guarda la nota en informe y en alumno
  */

  /*
  const getLinkPorRut = async (rut) => {
    try {
      const response = await fetch(API + `/usuarios/obtenerInformePorRut/${rut}`, {
        method: 'GET',
        redirect: 'follow',
      });
      const data = await response.json();
      return data.LINK || ''; // Retorna el enlace o un string vacío si no hay informe
    } catch (error) {
      console.error('Error de red al obtener informe:', error);
      return ''; // Manejo de error, retorna un string vacío
    }
  };

  const actualizarEnlaceInforme = async (rut) => {
    const enlaceInforme = await getLinkPorRut(rut);
    // Encuentra el índice del alumno con el rut correspondiente
    const index = curso.ALUMNOS.findIndex((alumno) => alumno.RUT === rut);
    if (index !== -1) {
      // Actualiza solo el enlace del informe para ese alumno
      setCurso((prevCurso) => {
        const nuevoCurso = { ...prevCurso };
        nuevoCurso.ALUMNOS = [...prevCurso.ALUMNOS];
        nuevoCurso.ALUMNOS[index] = { ...prevCurso.ALUMNOS[index], LINK: enlaceInforme };
        return nuevoCurso;
      });
    }
  };

  const getNotaPorRut = async (rut) => {
    try {
      const response = await fetch(API + `/usuarios/obtenerInformePorRut/${rut}`, {
        method: 'GET',
        redirect: 'follow',
      });
      const data = await response.json();
      return data.NOTA || ''; // Retorna la nota o un string vacío si no hay nota
      
    } catch (error) {
      console.error('Error de red al obtener nota:', error);
      return ''; // Manejo de error, retorna un string vacío
    }
  };

  const actualizarNotaInforme = async (rut) => {
    try {
      const notaInforme = await getNotaPorRut(rut);
      // Encuentra el índice del alumno con el rut correspondiente
      const index = curso.ALUMNOS.findIndex((alumno) => alumno.RUT === rut);
      if (index !== -1) {
        // Actualiza solo la nota del informe para ese alumno
        setCurso((prevCurso) => {
          const nuevoCurso = { ...prevCurso };
          nuevoCurso.ALUMNOS = [...prevCurso.ALUMNOS];
          nuevoCurso.ALUMNOS[index] = { ...prevCurso.ALUMNOS[index], NOTA: notaInforme };
          return nuevoCurso;
        });
      }
    } catch (error) {
      console.error('Error al actualizar la nota del informe:', error);
    }
  };

  */

  const handleActualizarInformes = async () => {
    try {
      for (let i = 0; i < curso.ALUMNOS.length; i++) {
        const rutAlumno = curso.ALUMNOS[i].RUT;

        // Obtener enlace del informe
        try {
          const responseLink = await fetch(API + `/usuarios/obtenerInformePorRut/${rutAlumno}`, {
            method: 'GET',
            redirect: 'follow',
          });
          const dataLink = await responseLink.json();
          const enlaceInforme = dataLink.LINK || '';

          // Actualizar enlace del informe para ese alumno
          setCurso((prevCurso) => {
            const nuevoCurso = { ...prevCurso };
            nuevoCurso.ALUMNOS = [...prevCurso.ALUMNOS];
            const index = nuevoCurso.ALUMNOS.findIndex((alumno) => alumno.RUT === rutAlumno);
            if (index !== -1) {
              nuevoCurso.ALUMNOS[index] = { ...nuevoCurso.ALUMNOS[index], LINK: enlaceInforme };
            }
            return nuevoCurso;
          });
        } catch (errorLink) {
          console.error('Error de red al obtener enlace:', errorLink);
        }

        // Obtener nota del informe
        try {
          const responseNota = await fetch(API + `/usuarios/obtenerInformePorRut/${rutAlumno}`, {
            method: 'GET',
            redirect: 'follow',
          });
          const dataNota = await responseNota.json();
          const notaInforme = dataNota.NOTA || '';


          // Actualizar nota del informe para ese alumno
          setCurso((prevCurso) => {
            const nuevoCurso = { ...prevCurso };
            nuevoCurso.ALUMNOS = [...prevCurso.ALUMNOS];
            const index = nuevoCurso.ALUMNOS.findIndex((alumno) => alumno.RUT === rutAlumno);
            if (index !== -1) {
              nuevoCurso.ALUMNOS[index] = { ...nuevoCurso.ALUMNOS[index], NOTA: notaInforme };
            }
            return nuevoCurso;
          });
        } catch (errorNota) {
          console.error('Error de red al obtener nota:', errorNota);
        }
      }


    } catch (error) {


    }
  };




  const handleCalificarInforme = async (rut) => {
    try {
      const response = await fetch(API + `/usuarios/calificarPorRut/${rut}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NOTA: notaInformes[rut],
        }),
      });

      if (response.ok) {

        // Puedes actualizar la lista de informes después de la calificación si es necesario
        setActualizarInformes(true);
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de red al enviar la solicitud.');
    }
  };

  const handleInputFocus = () => {
    setDropdownAbierto(true); // Abre el dropdown cuando el input obtiene foco
  };

  const handleSolicitarEvaluación = async () => {

  }

  const handleAgregarAlCurso = async (rutAlumno, NRC, ACI, PERIODO) => {
    try {
        const response = await fetch(API+'/cursos/agregar-alumno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rutAlumno: rutAlumno,
                NRC: NRC,
                ACI: ACI,
                PERIODO: PERIODO
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Manejar el mensaje de éxito
            setActualizarCurso(prevState => !prevState);
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al agregar alumno al curso');
        }
    } catch (error) {
        console.error('Error al agregar alumno al curso:', error.message);
    }
};

  return (
    <Fragment >
      <NavbarPortalProfesor />

      <div className="container-fluid">
      {curso ? (
        <div>
          <div className="d-sm-block">
            <p><strong>Nombre:</strong> {curso.NOMBRE}</p>
            <p><strong>Profesor:</strong> {curso.PROFESOR}</p>
            <p><strong>NRC:</strong> {curso.NRC}</p>
            <p><strong>ACI:</strong> {curso.ACI}</p>
            <p><strong>Periodo:</strong> {curso.PERIODO}</p>
          </div>
          <h3>Alumnos:</h3>
          
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
                <th>Link Informe</th>
                <th>Nota Informe</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {curso && curso.ALUMNOS && curso.ALUMNOS.length > 0 ? (
                curso?.ALUMNOS?.map((alumno, index) => (
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
                      {alumno.LINK ? (
                        <a
                          href={`${alumno.LINK}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'blue' }}
                        >
                          Descargar
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {alumno.NOTA || 'N/A'}
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="7"
                        value={notaInformes[alumno.RUT]}
                        onChange={(e) =>
                          setNotaInformes((prevNotaInformes) => ({
                            ...prevNotaInformes,
                            [alumno.RUT]: e.target.value,
                          }))
                        }
                      />
                    </td>

                    <td>
                      <button onClick={() => handleCalificarInforme(alumno.RUT)}>
                        Calificar
                      </button>
                      <button onClick={() => handleEliminarAlumno(curso._id, alumno.RUT)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))) : (<tr><td colSpan="19">No hay alumnos en este curso.</td></tr>
              )}
            </tbody>
          </Table>
          <div className="input-wrapper" style={{ backgroundColor: "white", width: "100%", borderRadius: "10px", height: "2.5rem", padding: "0 15px", boxShadow: "0 0 8px #ddd", display: "flex", alignItems: "center", position: "relative" }}>
              <FaSearch id="search-icon" style={{ color: "royalblue" }} />
              <input 
                  type="text" 
                  placeholder="Agregar Alumno por RUT" 
                  value={rutBusqueda} 
                  onChange={(e) => handleSearchChange(e.target.value)} 
                  onFocus={handleInputFocus}
                  style={{ backgroundColor: "transparent", border: "none", height: "100%", fontSize: "1.25rem", width: "100%", marginLeft: "5px", color: "black", outline: "none" }}
              />
              {
                  dropdownAbierto && results.length > 0 && (
                      <div className="results-list" style={{ position: "absolute", top: "calc(100% + 5px)", left: "0", width: "100%", backgroundColor: "white", boxShadow: "0px 0px 8px #ddd", borderRadius: "10px", maxHeight: "300px", overflowY: "auto" }}>
                          {results.map((alumno, index) => (
                              <div className="search-result" key={index}  onClick={() => { handleSeleccionarAlumno(alumno); setDropdownAbierto(false); }} style={{ boxSizing: "border-box", margin: "0px", padding: "10px 20px", borderBottom: "1px solid #ddd", fontFamily: "Helvetica, sans-serif", cursor: "pointer" }}>
                                  {alumno.RUT}
                              </div>
                          ))}
                      </div>
                  )
              }
              <div style={{ position: "absolute", right: "-10px", marginRight: "0px", bottom: "0px" }}> {/* Ajuste de posición del botón */}
                  <button style={{ backgroundColor: "green", color: "white", border: "none", borderRadius: "10Px", padding: "0.5rem 1rem", cursor: "pointer" }} onClick={() => handleAgregarAlCurso(rutBusqueda,curso.NRC,curso.ACI,curso.PERIODO)}>+</button>
              </div>
          </div>

          
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Subir CSV</button>

          <div>
            <h1>
              Evaluación de supervisores
            </h1>
            <Button variant="info" onClick={handleSolicitarEvaluación}>
              Solicitar Evaluación
            </Button>

            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido Paterno</th>
                  <th>Apellido Materno</th>
                  <th>RUT</th>
                  <th>Evaluación</th>
                </tr>
              </thead>
              <tbody>
                {curso && curso.ALUMNOS && curso.ALUMNOS.length > 0 ? (
                  curso?.ALUMNOS?.map((alumno, index) => (
                    <tr key={index}>
                      <td>{alumno.NOMBRES}</td>
                      <td>{alumno.APELLIDO_PATERNO}</td>
                      <td>{alumno.APELLIDO_MATERNO}</td>
                      <td>{alumno.RUT}</td>
                      <td>
                      </td>
                    </tr>
                  ))) : (<tr><td colSpan="19">No hay alumnos en este curso.</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

      ) : (
        <div>
          <h1>Crear Nuevo Curso</h1>
          <Button variant="info" onClick={() => navigate("/portalprofesor/curso/crear")}>
            Crear Curso
          </Button>
        </div>
      )}
      </div>


    </Fragment>
  );
}

export { CursoMostrar }