import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { API } from "./../apiSelection";

const SUPERVISOR_EMAIL_REGEX =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const CREATE_SUPERVISOR_URL = API + "/supervisores/crear";

const RegistrarSupervisor = () => {
  const correoRef = useRef();
  const contraseñaRef = useRef();
  const confirmarContraseñaRef = useRef();
  const errorRef = useRef();

  const [correo, setCorreo] = useState("");
  const [rutAlumno, setRutAlumno] = useState("");
  const [correoValido, setCorreoValido] = useState(false);

  const [pwd, setpwd] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [pwdFocus, setPwdFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);

  useEffect(() => {
    correoRef.current.focus();
  }, []);

  useEffect(() => {}, [correoValido]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formato del correo electrónico
    if (!SUPERVISOR_EMAIL_REGEX.test(correo)) {
      setErrMsg("Correo electrónico inválido");
      return;
    }

    // Validar longitud mínima de la contraseña
    if (pwd.length < 6) {
      setErrMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validar que las contraseñas coincidan
    if (pwd !== confirmarContraseña) {
      setErrMsg("Las contraseñas no coinciden");
      return;
    }

    // Si todas las validaciones pasan, enviar la solicitud para crear el supervisor
    try {
      const response = await fetch(API + "/supervisores/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CORREO: correo,
          CONTRASEÑA: pwd,
          RUTA: rutAlumno,
        }),
      });
      console.log(response);
      console.log(rutAlumno);

      if (response.status === 201) {
        // Supervisor creado exitosamente
        setSuccess(true);
      } else if (response.status === 409) {
        // Ya existe un supervisor con este correo electrónico
        const data = await response.json();
        setErrMsg("Error al crear supervisor: " + data.message);
      } else if (response.status === 500) {
        // Error interno del servidor
        setErrMsg("Error interno del servidor al crear supervisor");
      } else {
        // Otro código de estado no esperado
        setErrMsg("Error al crear supervisor: " + response.statusText);
      }
    } catch (error) {
      console.error("Error al crear supervisor:", error.message);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleChangeCorreo = async (e) => {
    const nuevoCorreo = e.target.value;
    setCorreo(nuevoCorreo);

    try {
      const response = await fetch(API + "/supervisores/comprobar-correo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correoSupervisor: nuevoCorreo }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setCorreoValido(true); // El correo es válido
        console.log(data.rutAlumno);
        setRutAlumno(data.rutAlumno);
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
    <section className="w-full max-w-md mx-auto p-4 bg-black bg-opacity-40 rounded-md">
      {success ? (
        <div>
          <h1>Éxito</h1>
          <p>
            <Link to="/iniciar-sesion-supervisor">Iniciar Sesión</Link>
          </p>
        </div>
      ) : (
        <div>
          <p
            ref={errorRef}
            className={
              errMsg ? "errmsg text-red-500 font-bold mb-4" : "offscreen"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl font-bold mb-6">
            Registrarse como Supervisor
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <label htmlFor="correo">
              Correo Electrónico:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  correoValido ? "valid text-green-500 ml-2" : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  correoValido || !correo
                    ? "hidden"
                    : "invalid  text-red-500 ml-2"
                }
              />
            </label>
            <input
              type="email"
              id="correo"
              ref={correoRef}
              value={correo}
              onChange={handleChangeCorreo}
              required
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="contraseña">Contraseña:</label>
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
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "hidden"}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              Mínimo 6 caracteres, 1 número, 1 mayúscula.
            </p>
            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmarContraseña"
              ref={confirmarContraseñaRef}
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
              disabled={!correoValido}
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!correoValido}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Registrarse
            </button>
          </form>
          <p className="mt-4 text-white">
            ¿Ya estás registrado?
            <br />
            <span className="line">
              <Link to="/iniciar-sesion-supervisor" className="text-blue-500 hover:text-blue-400">
                Iniciar Sesión como Supervisor
              </Link>
            </span>
          </p>
          <p>
            ¿No eres supervisor?
            <br />
            <span className="line">
              <Link to="/iniciar-sesion" className="text-blue-500 hover:text-blue-400">Iniciar Sesión</Link>
            </span>
          </p>
        </div>
      )}
    </section>
  );
};

export { RegistrarSupervisor };
