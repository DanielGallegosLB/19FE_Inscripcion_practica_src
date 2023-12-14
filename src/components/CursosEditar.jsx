import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

function CursosEditar() {
  const [id, setId] = useState("");
  const [profesor, setProfesor] = useState("");
  const [rutProfesor, setRutProfesor] = useState("");
  const [nrc, setNrc] = useState("");
  const [aci, setAci] = useState("");
  const [cursos, setCursos] = useState([]);

  let history = useNavigate();

  const getCursos = async () => {
    try {
      const response = await fetch(API + "/cursos/obtener-cursos");
      const data = await response.json();
      setCursos(data.cursos);
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedCurso = {
      PROFESOR: profesor,
      RUTPROFESOR: rutProfesor,
      NRC: nrc,
      ACI: aci,
    };

    fetch(API + `/cursos/editar-curso/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCurso),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Curso actualizado correctamente");
          history("/cursos");
          return response.json();
        } else {
          alert("Error al actualizar el curso");
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const handleEdit = () => {
    const curso = cursos.find((curso) => curso._id === id);
  
    if (curso) {
      setProfesor(curso.PROFESOR || "");  // Asegúrate de que la clave sea correcta
      setRutProfesor(curso.RUTPROFESOR || "");  // Asegúrate de que la clave sea correcta
      setNrc(curso.NRC || "");  // Asegúrate de que la clave sea correcta
      setAci(curso.ACI || "");  // Asegúrate de que la clave sea correcta
    }
  };
  

  useEffect(() => {
    getCursos();
    const stId = localStorage.getItem("id") || "";
    const stprofesor = localStorage.getItem("profesor") || "";
    const strutProfesor = localStorage.getItem("rutProfesor") || "";
    const stnrc = localStorage.getItem("nrc") || "";
    const staci = localStorage.getItem("aci") || "";

    setId(stId);
    setProfesor(stprofesor);
    setRutProfesor(strutProfesor);
    setNrc(stnrc);
    setAci(staci);

    handleEdit();
  }, [cursos]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="profesor">
          <Form.Label>Profesor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese profesor"
            value={profesor}
            required
            onChange={(e) => setProfesor(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rutProfesor">
          <Form.Label>Rut del Profesor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Rut del Profesor"
            value={rutProfesor}
            required
            onChange={(e) => setRutProfesor(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nrc">
          <Form.Label>NRC</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese NRC"
            value={nrc}
            required
            onChange={(e) => setNrc(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="aci">
          <Form.Label>ACI</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese ACI"
            value={aci}
            required
            onChange={(e) => setAci(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={(e) => handleUpdate(e)}>
          Guardar
        </Button>
      </Form>
    </div>
  );
}

export { CursosEditar };
