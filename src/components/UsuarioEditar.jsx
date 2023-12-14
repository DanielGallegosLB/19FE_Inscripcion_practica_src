import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

function UsuarioEditar() {
  const [id, setId] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState("");
  const [perfiles, setPerfiles] = useState([]);
  const history = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      RUT: rut,
      CONTRASEÑA: password,
      PERFIL: perfil,
    };

    try {
      const response = await fetch(API + `/usuarios/editar-usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.status === 200) {
        console.log("Usuario actualizado exitosamente");
        // Redirige a la página de inicio u otra acción después de la actualización
        history("/usersmanage");
      } else {
        console.error("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    const storedId = localStorage.getItem("id") || "";
    const storedRut = localStorage.getItem("rut") || "";
    const storedPassword = localStorage.getItem("password") || "";
    const storedPerfil = localStorage.getItem("perfil") || ""; // Esto es una cadena

    setId(storedId);
    setRut(storedRut);
    setPassword(storedPassword);
    setPerfil(storedPerfil);

    // Realiza la solicitud para obtener la lista de perfiles al montar el componente
    const fetchPerfiles = async () => {
      try {
        const response = await fetch(API + '/perfiles/obtener');
        if (response.status === 200) {
          const data = await response.json();
          // Extrae solo los nombres de los perfiles y guárdalos en perfiles
          const nombresPerfiles = data.perfiles.map((perfil) => perfil.NOMBRE);
          setPerfiles(nombresPerfiles);
        } else {
          console.error('Error al obtener la lista de perfiles');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchPerfiles();
  }, []);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={id} readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rut">
          <Form.Label>Rut</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="perfil">
          <Form.Label>Perfil</Form.Label>
          <Form.Control
            as="select"
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            required
          >
            <option value="">Seleccione un perfil</option>
            {Array.isArray(perfiles) && perfiles.length > 0
              ? perfiles.map((nombrePerfil) => (
                  <option key={nombrePerfil} value={nombrePerfil}>
                    {nombrePerfil}
                  </option>
                ))
              : null}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={(e) => handleUpdate(e)}>
          Guardar
        </Button>
      </Form>
    </div>
  );
}

export { UsuarioEditar };
