import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

function CrearUsuario() {
    const [rut, setRut] = useState("");
    const [perfil, setPerfil] = useState("");
    const [password, setPassword] = useState("");
    const [perfiles, setPerfiles] = useState([]);
    const history = useNavigate();

    useEffect(() => {
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

    const handleUserCreate = async (e) => {
        e.preventDefault();
    
        // Assuming rut, perfil, and password are variables defined elsewhere in your code
        const newUser = {
            RUT: rut,  // Adjust to match the expected format on the server
            PERFIL: perfil,  // Adjust to match the expected format on the server
            CONTRASEÑA: password,  // Adjust to match the expected format on the server
            // Add other properties as needed
        };
    
        try {
            const response = await fetch(API + '/usuarios/crear-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            if (response.status === 201) {
                console.log('Usuario creado exitosamente');
                // Redirige a la página de inicio o realiza alguna otra acción
                history("/usersmanage");
            } else {
                console.error('Error al crear el usuario');
                console.log(response);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    

    return (
        <div style={{ margin: "7rem" }}>
            <Form>
                <Form.Group className="mb-3" controlId="rut">
                    <Form.Label>Rut</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Rut" required onChange={(e) => setRut(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="perfil">
                    <Form.Label>Perfil</Form.Label>
                    <Form.Control as="select" value={perfil} onChange={(e) => setPerfil(e.target.value)} required>
                        <option value="">Seleccione un perfil</option>
                        {Array.isArray(perfiles) && perfiles.length > 0
                            ? perfiles.map((nombrePerfil) => (
                                <option key={nombrePerfil} value={nombrePerfil}>
                                    {nombrePerfil}
                                </option>
                            ))
                            : null
                        }
                    </Form.Control>
                </Form.Group>



                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Contraseña" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={(e) => handleUserCreate(e)}>
                    Crear Usuario
                </Button>
            </Form>
        </div >
    );
}

export { CrearUsuario };
