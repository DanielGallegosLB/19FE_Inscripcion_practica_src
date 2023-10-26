import React, { Fragment, useEffect, useState, useRef } from "react";
import {useAuth} from '../hooks/useAuth';
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {API} from './Home'

const LOGIN_URL = API+'/usuarios/auth';

function IniciarSesion() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre: user, contraseña: pwd }), // Ajusta los nombres de usuario y contraseña
        });
    
        if (response.status === 200) {
          // Autenticación exitosa
          const data = await response.json();
          const accessToken = data.accessToken;
          const roles = data.ROLES; // Ajusta la propiedad de roles según la respuesta del servidor
    
          setAuth({ user, pwd, roles, accessToken });
          setUser('');
          setPwd('');
          navigate(from, { replace: true });
        } else if (response.status === 404) {
          // Usuario no encontrado
          setErrMsg('Usuario no encontrado');
        } else {
          // Otros errores
          setErrMsg('Error en la autenticación');
        }
      } catch (err) {
        // Error de red u otros errores
        setErrMsg('Error en la autenticación');
        errRef.current.focus();
      }
    };
    
      



    return (
        <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario:</label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
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
            <button>Iniciar Sesión</button>
        </form>
        <p>
            Necesitas una cuenta?<br />
            <span className="line">
                <Link to="/registrarse">Registrarse</Link>
            </span>
        </p>
    </section>
        )
}

export {IniciarSesion}