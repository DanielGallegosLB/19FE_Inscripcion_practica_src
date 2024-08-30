import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API } from "./../apiSelection";

function IniciarSesion() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [rut, setRut] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
    localStorage.setItem('rut', rut);
  }, [rut, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!calcularDigitoVerificador(rut)) {
      setErrMsg('Rut inválido');
      return;
    }

    try {
      const response = await fetch(API + '/usuarios/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, contraseña: pwd }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.accessToken;
        const perfil = data.PERFIL;
        const id = data._id;
        const rut = data.RUT;
        const perfil2 = perfil[0];

        setAuth({ id, rut, perfil, accessToken });
        setRut('');
        setPwd('');

        switch (perfil2) {
          case "Administrador":
            navigate("/portaladmin", { replace: true });
            break;
          case "Alumno":
            navigate("/portalalumno", { replace: true });
            break;
          case "Supervisor":
            navigate("/portalsupervisor", { replace: true });
            break;
          case "Profesor":
            navigate("/portalprofesor", { replace: true });
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

  function calcularDigitoVerificador(rut) {
    rut = rut.replace(/[.-]/g, '');

    const rutSinDV = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1);

    const rutInvertido = rutSinDV.split('').reverse().join('');

    let suma = 0;
    let multiplicador = 2;

    for (let i = 0; i < rutInvertido.length; i++) {
      suma += parseInt(rutInvertido.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;

    let digitoEsperado;
    if (resto === 0) {
      digitoEsperado = 0;
    } else if (resto === 1) {
      digitoEsperado = 'K';
    } else {
      digitoEsperado = 11 - resto;
    }

    return digitoEsperado.toString() === digitoVerificador;
  }

  return (
    <section className="w-full max-w-md mx-auto p-4 bg-black bg-opacity-40 rounded-md">
      <p ref={errRef} className={errMsg ? "errmsg text-red-500 font-bold mb-4" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <label htmlFor="rut" className="text-white">
          Rut:
        </label>
        <input
          type="text"
          id="rut"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setRut(e.target.value)}
          value={rut}
          required
          className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="text-white">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700">
          Iniciar Sesión
        </Button>
      </form>
      <p className="mt-4">
        ¿Necesitas una cuenta?<br />
        <span className="line">
          <Link to="/registrarse" className="text-blue-500 hover:text-blue-400">Registrarse</Link>
        </span>
      </p>
      <p className="mt-4">
        ¿Eres un supervisor?<br />
        <span className="line">
          <Link to="/iniciar-sesion-supervisor" className="text-blue-500 hover:text-blue-400">Iniciar Sesión como Supervisor</Link>
        </span>
      </p>
    </section>
  );
}

export { IniciarSesion };
