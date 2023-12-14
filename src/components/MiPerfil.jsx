import React, { useState, useEffect } from 'react';
import { API } from '../apiSelection';
import { NavbarPortalAlumno } from "./NavbarPortalAlumno";

function MiPerfil() {
    const [usuario, setUsuario] = useState({
        NOMBRES: '',
        APELLIDO_PATERNO: '',
        APELLIDO_MATERNO: '',
        FECHA_DE_NACIMIENTO: '',
        TELÉFONO: '',
        CORREO: '',
        FACULTAD: '',
        ESCUELA: '',
        CARRERA: '',
        REGÍMEN: '',
        SEDE: '',
        NRC: '',
        ACI: '',
        PERIODO: '',
    });

    useEffect(() => {
        // Obtener el rut del usuario desde el contexto de autenticación
        const rut = localStorage.getItem('rut');
        const obtenerUsuario = async () => {
            try {
                const response = await fetch(API + `/usuarios/obtenerUsuarioPorRut/${rut}`);
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error(error);
            }
        };

        obtenerUsuario();
    }, []);

    const camposPermitidos = [
        'NOMBRES',
        'APELLIDO_PATERNO',
        'APELLIDO_MATERNO',
        'FECHA_DE_NACIMIENTO',
        'TELÉFONO',
        'CORREO',
        'FACULTAD',
        'ESCUELA',
        'CARRERA',
        'REGÍMEN',
        'SEDE',
        'NRC',
        'ACI',
        'PERIODO',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rut = localStorage.getItem('rut');
        try {
            const response = await fetch(API + `/usuarios/editarUsuarioPorRut/${rut}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (response.ok) {
                console.log('Usuario actualizado correctamente');
            } else {
                console.error('Error al actualizar el usuario');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <NavbarPortalAlumno />

        
        <div>
      

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h1>Mi Perfil</h1>
          <form onSubmit={handleSubmit}>
            {camposPermitidos.map((campo) => (
              <div key={campo}>
                <label htmlFor={campo}>{campo}:</label>
                <input
                  type="text"
                  id={campo}
                  name={campo}
                  value={usuario[campo]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <button type="submit">Guardar cambios</button>
          </form>
        </div>

        {/* Sección para mostrar la nota del informe a la derecha */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
          <h2>Nota de Informe</h2>
          <p style={{ fontSize: '40px', marginBottom: '5px' }}>
            Nota: {usuario.INFORME ? usuario.INFORME.NOTA : 'No disponible'}
          </p>
          {/* Puedes agregar más detalles del informe aquí si es necesario */}
        </div>
      </div>
    </div>
    </div>
      );
}

export { MiPerfil };
