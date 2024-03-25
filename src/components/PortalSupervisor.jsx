import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { NavbarPortalSupervisor } from "./NavbarPortalSupervisor";

function PortalSupervisor() {
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        setMensaje("Debe seleccionar un archivo para subir.");
        return;
      }

      // Aquí puedes hacer la lógica para subir el archivo al servidor
      console.log("Subiendo archivo:", file.name);

      // Lógica para enviar el archivo al servidor...

      setMensaje("Archivo subido exitosamente.");
    } catch (error) {
      console.error("Error al subir archivo:", error);
      setMensaje(
        "Error al subir el archivo. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div>
      <NavbarPortalSupervisor />
      <h1>Bienvenido al Portal del Supervisor</h1>
      <h2>Subir Evaluación</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar archivo:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Subir
        </Button>
      </Form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export { PortalSupervisor };
