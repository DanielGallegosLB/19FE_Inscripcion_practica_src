import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { API } from "./../apiSelection";

const USER_REGEX = /^[0-9]+$/; // Se ajustó para permitir solo números en el RUT
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Se ajustó para requerir 6 caracteres, 1 número, 1 mayúscula
const CREATE_USER_URL = API + "/usuarios/crear-usuario";
const SUPERVISOR_EMAIL_REGEX =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Registrarse = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [validSupervisorEmail, setValidSupervisorEmail] = useState(false);
  const [supervisorEmailFocus, setSupervisorEmailFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Entrada inválida");
      return;
    }
    try {
      const response = await fetch(CREATE_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ RUT: user, CONTRASEÑA: pwd }),
      });

      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sin respuesta del servidor");
      } else if (err.response?.status === 409) {
        setErrMsg("Nombre de usuario ocupado");
      } else {
        setErrMsg("Error en el registro");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
          <h1 className="text-4xl font-bold">Éxito</h1>
          <p className="mt-4">
            <Link
              to="/iniciar-sesion"
              className="text-blue-500 hover:text-blue-400"
            >
              Iniciar Sesión
            </Link>
          </p>
        </section>
      ) : (
        <section className="w-full max-w-md mx-auto p-4 bg-black bg-opacity-40 rounded-md">
          <p
            ref={errRef}
            className={
              errMsg ? "errmsg text-red-500 font-bold mb-4" : "offscreen"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl font-bold mb-6">Registrarse</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="username" className="text-white">
              Rut:
              {user && (
                <>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "text-green-500 ml-2" : "hidden"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      !validName ? "invalid text-red-500 ml-2" : "hidden"}
                  />
                </>
              )}
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? "instructions text-sm text-gray-400"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Solo números permitidos para el RUT.
            </p>

            <label htmlFor="password" className="text-white">
              Contraseña:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid text-green-500 ml-2" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                    !validPwd && pwd ? "text-red-500 ml-2" : "hidden"
                }
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "instructions text-sm text-gray-400"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Mínimo 6 caracteres, 1 número, 1 mayúscula.
            </p>

            <label htmlFor="confirm_pwd" className="text-white">
              Confirmar Contraseña:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validMatch && matchPwd ? "valid text-green-500 ml-2" : "hidden"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                    !validMatch && matchPwd ? "text-red-500 ml-2" : "hidden"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "instructions text-sm text-gray-400"
                  : "hidden"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Debe coincidir con el campo de contraseña.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              Registrarse
            </button>
          </form>
          <p className="mt-4 text-white">
            ¿Ya estás registrado?
            <br />
            <span className="line">
              <Link
                to="/iniciar-sesion"
                className="text-blue-500 hover:text-blue-400"
              >
                Iniciar Sesión
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export { Registrarse };
