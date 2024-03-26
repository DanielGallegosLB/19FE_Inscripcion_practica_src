import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";
import { useAuth } from '../hooks/useAuth';

function IniciarSesionSupervisor() {
  const navigate = useNavigate();
  const correoRef = useRef();
  const pwdRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const [correo, setCorreo] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API + '/supervisores/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CORREO: correo, CONTRASEÑA: pwd }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        const perfil = data.PERFIL;
        const id = data._id;

        // Guardar datos de sesión en el almacenamiento local
        localStorage.setItem('id', id);
        localStorage.setItem('correo', correo);
        localStorage.setItem('perfil', perfil);
        localStorage.setItem('accessToken', accessToken);

        // Establecer la autenticación en el contexto de autenticación
        setAuth({ id, correo, perfil, accessToken });

        // Limpiar campos
        setCorreo('');
        setPwd('');

        // Redirigir al usuario al portal correspondiente según su perfil
        switch (perfil) {
          case "Supervisor":
            navigate("/portalsupervisor");
            break;
          default:
            setErrMsg('Perfil de usuario no válido');
            break;
        }
      } else if (response.status === 404) {
        setErrMsg('Usuario no encontrado');
      } else {
        setErrMsg('Error en la autenticación');
      }
    } catch (err) {
      setErrMsg('Error en la autenticación');
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Iniciar Sesión como Supervisor</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="correo">Correo Electrónico:</label>
        <input
          type="email"
          id="correo"
          ref={correoRef}
          autoComplete="off"
          onChange={(e) => setCorreo(e.target.value)}
          value={correo}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          ref={pwdRef}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
      </form>
      <p>
        ¿No tienes una cuenta?<br />
        <span className="line">
          <Link to="/registrarse-supervisor">Registrarse</Link>
        </span>
      </p>
    </section>
  );
}

export { IniciarSesionSupervisor };
