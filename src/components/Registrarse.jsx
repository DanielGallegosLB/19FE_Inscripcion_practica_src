import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { API } from "./../apiSelection";

const USER_REGEX = /^[0-9]+$/; // Se ajustó para permitir solo números en el RUT
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Se ajustó para requerir 6 caracteres, 1 número, 1 mayúscula
const CREATE_USER_URL = API + '/usuarios/crear-usuario';
const SUPERVISOR_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Registrarse = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [validSupervisorEmail, setValidSupervisorEmail] = useState(false);
    const [supervisorEmailFocus, setSupervisorEmailFocus] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(() => {
        setValidSupervisorEmail(SUPERVISOR_EMAIL_REGEX.test(supervisorEmail));
    }, [supervisorEmail])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = SUPERVISOR_EMAIL_REGEX.test(supervisorEmail);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Entrada inválida");
            return;
        }
        try {
            // Crear el usuario utilizando la ruta especificada
            console.log("user: " + user)
            console.log("pwd: " + pwd)
            console.log("supervisorEmail: " + supervisorEmail)
            const response = await fetch(CREATE_USER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ RUT: user, CONTRASEÑA: pwd, SUPERVISOR_EMAIL: supervisorEmail }),
            });

            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            // Limpiar el estado y los inputs controlados
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sin respuesta del servidor');
            } else if (err.response?.status === 409) {
                setErrMsg('Nombre de usuario ocupado');
            } else {
                setErrMsg('Error en el registro')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Éxito</h1>
                    <p>
                        <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Registrarse</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Rut:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
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
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Solo números permitidos para el RUT.
                        </p>


                        <label htmlFor="supervisor_email">
                            Correo del Supervisor:
                            <FontAwesomeIcon icon={faCheck} className={validSupervisorEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validSupervisorEmail || !supervisorEmail ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="supervisor_email"
                            autoComplete="off"
                            onChange={(e) => setSupervisorEmail(e.target.value)}
                            value={supervisorEmail}
                            required
                            aria-invalid={validSupervisorEmail ? "false" : "true"}
                            aria-describedby="supervisoremailnote"
                            onFocus={() => setSupervisorEmailFocus(true)}
                            onBlur={() => setSupervisorEmailFocus(false)}
                        />
                        <p id="supervisoremailnote" className={supervisorEmailFocus && supervisorEmail && !validSupervisorEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Ingrese un correo electrónico válido para el supervisor.
                        </p>

                        <label htmlFor="password">
                            Contraseña:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
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
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Mínimo 6 caracteres, 1 número, 1 mayúscula.
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirmar Contraseña:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
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
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Debe coincidir con el campo de contraseña.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch}>Registrarse</button>
                    </form>
                    <p>
                        ¿Ya estás registrado?
                        <br />
                        <span className="line">
                            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export { Registrarse };
