import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { API } from "./../apiSelection";

const SUPERVISOR_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const CREATE_SUPERVISOR_URL = API + '/supervisores/crear';

const RegistrarSupervisor = () => {
    const correoRef = useRef();
    const contraseñaRef = useRef();
    const confirmarContraseñaRef = useRef();
    const errorRef = useRef();

    const [correo, setCorreo] = useState('');
    const [correoValido, setCorreoValido] = useState(false); 

    const [pwd, setpwd] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [pwdFocus, setPwdFocus] = useState(false);
    const [validPwd, setValidPwd] = useState(false);


    useEffect(() => {
        correoRef.current.focus();
    }, []);

    useEffect(() => {
      }, [correoValido]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!SUPERVISOR_EMAIL_REGEX.test(correo)) {
            setErrMsg('Correo electrónico inválido');
            return;
        }

        if (pwd.length < 6) {
            setErrMsg('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (pwd !== confirmarContraseña) {
            setErrMsg('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch(CREATE_SUPERVISOR_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contraseña: pwd }),
            });

            if (response.status === 200) {
                setSuccess(true);
            } else {
                setErrMsg('Error al registrar el supervisor');
            }
        } catch (error) {
            console.error('Error al registrar el supervisor:', error);
            setErrMsg('Error al registrar el supervisor');
        }
    };

    const handleChangeCorreo = async (e) => {
        const nuevoCorreo = e.target.value;
        setCorreo(nuevoCorreo);
    
        try {
          const response = await fetch(API+"/supervisores/comprobar-correo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ correoSupervisor: nuevoCorreo }),
          });
          
          if (response.status === 200) {
            setCorreoValido(true); // El correo es válido
          } else if (response.status === 404) {
            setCorreoValido(false); // El correo no es válido
          } else {
            console.error("Error al comprobar el correo:", response.status);
          }
        } catch (error) {
          console.error("Error al comprobar el correo:", error);
        }
      };



    return (
        <section>
            {success ? (
                <div>
                    <h1>Éxito</h1>
                    <p>
                        <Link to="/iniciar-sesion-supervisor">Iniciar Sesión</Link>
                    </p>
                </div>
            ) : (
                <div>
                    <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Registrarse como Supervisor</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="correo">
                            Correo Electrónico:
                            <FontAwesomeIcon icon={faCheck} className={correoValido ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={correoValido || !correo ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="correo"
                            ref={correoRef}
                            value={correo}
                            onChange={handleChangeCorreo}
                            required
                        />
                        <label htmlFor="contraseña">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="contraseña"
                            ref={contraseñaRef}
                            value={pwd}
                            onChange={(e) => setpwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            disabled={!correoValido}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Mínimo 6 caracteres, 1 número, 1 mayúscula.
                        </p>
                        <label htmlFor="confirmarContraseña">
                            Confirmar Contraseña:
                        </label>
                        <input
                            type="password"
                            id="confirmarContraseña"
                            ref={confirmarContraseñaRef}
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                            required
                            disabled={!correoValido}
                        />
                        <button type="submit" disabled={!correoValido}>Registrarse</button>
                    </form>
                    <p>
                        ¿Ya estás registrado?
                        <br />
                        <span className="line">
                            <Link to="/iniciar-sesion-supervisor">Iniciar Sesión</Link>
                        </span>
                    </p>
                </div>
            )}
        </section>
    );
};

export {RegistrarSupervisor};
