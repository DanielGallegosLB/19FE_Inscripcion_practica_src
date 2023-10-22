import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {API} from "./Home.jsx";

function CrearUsuario() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [permissions, setPermissions] = useState("");


    let history = useNavigate();

    const handleUserCreate = async (e) => {
         e.preventDefault();
         const newUser = {
            NOMBRES: name,
            CONTRASEÑA: password,
            PERMISOS: permissions,          
        };

            // Realizar la solicitud POST al servidor
        try {
            const response = await fetch(API+'/usuarios/crear-usuario', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido JSON
                },
                body: JSON.stringify(newUser), // Convierte el objeto a JSON y envíalo en el cuerpo de la solicitud
            });

            if (response.status === 200) {
                console.log('Usuario creado exitosamente');
                // La creación del usuario fue exitosa, redirige a la página de inicio o realiza alguna otra acción
                //history.push('/');
            } else {
                console.error('Error al crear el usuario');
                console.log(response);
            }
            } catch (error) {
            console.error('Error de red:', error);
            }        
         history("/");
    }


    return (
        <div style={{ margin: "7rem" }}>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese contraseña" required onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="permissions">
                    <Form.Label>Permisos</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese permisos" required onChange={(e) => setPermissions(e.target.value)}/>
                </Form.Group>
                <Link to={"/"}>
                    <Button variant="primary" onClick={(e) => handleUserCreate(e)}>
                        Crear Usuario
                    </Button>
                </Link>
            </Form>
        </div>
    );
}
export { CrearUsuario };