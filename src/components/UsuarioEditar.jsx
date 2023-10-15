import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Usuarios } from "./Usuarios";
import { Link, useNavigate } from "react-router-dom";
import { set } from "mongoose";

function UsuarioEditar() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [permissions, setPermissions] = useState("");
    const [rut, setRut] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    let history = useNavigate();

    const getUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:3001/obtener-usuarios'); // Ruta para obtener usuarios
            const data =  await response.json();
            setUsuarios(data.usuarios);
            
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    

    const getUsuarioById = (userId) => {
        const user = usuarios.find((user) => user._id === userId);
        if (user) {
          setId(user._id);
          setName(user.NOMBRES);
          setPassword(user.CONTRASEÑA);
          setPermissions(user.PERMISOS.join(', '));
          setRut(user.RUT);
        }
      }
    

    const handleUpdate = (e) => {
        e.preventDefault();
      
        // Construye el cuerpo de la solicitud con los datos actualizados
        const updatedUser = {
          NOMBRES: name,
          CONTRASEÑA: password,
          PERMISOS: permissions,
          RUT: rut,
        };
      
        fetch(`http://localhost:3001/usuarios/editar-usuario/${id}`, {
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
              history("/");
            } else {
              console.error('Error al actualizar el usuario');
            }
          })
          .catch((error) => {
            console.error('Error de red:', error);
          });
          //history("/");
      };

      useEffect(() => {
        getUsuarios();
        const storedId = localStorage.getItem("id") || "";
        const storedName = localStorage.getItem("name") || "";
        const storedPassword = localStorage.getItem("password") || "";
        const storedPermissions = localStorage.getItem("permissions") || ""; // Esto es una cadena
        const storedRut = localStorage.getItem("rut") || "";
    

        setId(storedId);
        setName(storedName);
        setPassword(storedPassword);
        setPermissions(storedPermissions);
        setRut(storedRut);
        getUsuarioById(storedId); // Cargar detalles del usuario por ID
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
                    <Form.Label>Permisos</Form.Label>
                    <Form.Control type="list" placeholder="Ingrese permisos (separados por coma)" value={permissions} required onChange={(e) => setPermissions(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="rut">
                    <Form.Label>Rut</Form.Label>
                    <Form.Control type="list" placeholder="Ingrese rut" value={rut} required onChange={(e) => setRut(e.target.value)}/>
                </Form.Group>
                
                    <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                        Guardar
                    </Button>
                
            </Form>
        </div>
    )


}
export { UsuarioEditar };