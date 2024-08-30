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
    <section className="w-full max-w-md mx-auto p-4 bg-black bg-opacity-40 rounded-md">
      <p ref={errRef} className={errMsg ? "errmsg text-red-500 font-bold mb-4" : "hidden"} aria-live="assertive">{errMsg}</p>
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión como Supervisor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <label htmlFor="correo">Correo Electrónico:</label>
        <input
          type="email"
          id="correo"
          ref={correoRef}
          autoComplete="off"
          onChange={(e) => setCorreo(e.target.value)}
          value={correo}
          required
          className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          ref={pwdRef}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit"  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700">Iniciar Sesión</Button>
      </form>
      <p className="mt-4">
        ¿No tienes una cuenta?<br />
        <span className="line">
          <Link to="/registrar-supervisor" className="text-blue-500 hover:text-blue-400">Registrarse como Supervisor</Link>
        </span>
      </p>
      <p className="mt-4">
        ¿No eres supervisor?
        <br />
        <span className="line">
            <Link to="/iniciar-sesion" className="text-blue-500 hover:text-blue-400">Iniciar Sesión</Link>
        </span>
      </p>
    </section>
  );
}

export { IniciarSesionSupervisor };
