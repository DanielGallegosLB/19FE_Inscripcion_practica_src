import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {API} from "./Home.jsx";

function UsuarioEditar() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [perfil, setPerfil] = useState("");

    let history = useNavigate();

    
    const handleUpdate = (e) => {
        e.preventDefault();
      
        // Construye el cuerpo de la solicitud con los datos actualizados
        const updatedUser = {
          NOMBRES: name,
          CONTRASEÑA: password,
          PERFIL: perfil,
        };
      
        fetch(API+`/usuarios/editar-usuario/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Usuario actualizado exitosamente');
              // Redirige a la página de inicio u otra acción después de la actualización
              history("/manageprofiles");
            } else {
              console.error('Error al actualizar el usuario');
            }
          })
          .catch((error) => {
            console.error('Error de red:', error);
          });
          history("/manageprofiles");
      };

      useEffect(() => {
        const storedId = localStorage.getItem("id") || "";
        const storedName = localStorage.getItem("name") || "";
        const storedPassword = localStorage.getItem("password") || "";
        const storedPerfil = localStorage.getItem("perfil") || ""; // Esto es una cadena
    

        setId(storedId);
        setName(storedName);
        setPassword(storedPassword);
        setPerfil(storedPerfil);

      }, []);


    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="id">
                    <Form.Label>id</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese id" value={id} required onChange={(e) => setId(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombres" value={name} required onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese contraseña" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="permissions">
                    <Form.Label>Perfil</Form.Label>
                    <Form.Control type="list" placeholder="Ingrese permisos (separados por coma)" value={perfil} required onChange={(e) => setPerfil(e.target.value)}/>
                </Form.Group>
                
                    <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                        Guardar
                    </Button>
                
            </Form>
        </div>
    )


}
export { UsuarioEditar };