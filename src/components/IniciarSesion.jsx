import React, { useEffect, useState, useRef } from "react";
import { useAuth } from '../hooks/useAuth';
import { Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

    // Validar el RUT
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
        console.log("Perfil:" + perfil2)
        switch (perfil2) {
          case "Administrador":
            navigate("/portaladmin", { replace: true });
            break;
          case "Alumno":
            console.log("Alumno")
            navigate("/portalalumno", { replace: true });
            break;
          case "Supervisor":
            navigate("/portalsupervisor", { replace: true });
            break;
          case "Profesor":
            navigate("/portalprofesor", { replace: true });
            break;
          default:
            console.log("Perfil no válido")
            console.log(perfil2)
            // En caso de perfil desconocido o no manejado
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
    // Limpia el rut de puntos y guiones
    rut = rut.replace(/[.-]/g, '');

    // Separa el rut del dígito verificador
    const rutSinDV = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1);

    // Invierte el rut
    const rutInvertido = rutSinDV.split('').reverse().join('');

    // Multiplica y suma
    let suma = 0;
    let multiplicador = 2;

    for (let i = 0; i < rutInvertido.length; i++) {
      suma += parseInt(rutInvertido.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    // Calcula el resto
    const resto = suma % 11;

    // Calcula el dígito verificador esperado
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
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rut">Rut:</label>
        <input
          type="text"
          id="rut"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setRut(e.target.value)}
          value={rut}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
      </form>
      <p>
        Necesitas una cuenta?<br />
        <span className="line">
          <Link to="/registrarse">Registrarse</Link>
        </span>
      </p>
    </section>
  );
}

export { IniciarSesion };
