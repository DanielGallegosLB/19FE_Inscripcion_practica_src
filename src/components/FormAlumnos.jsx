import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";
import { useAuth } from "../hooks/useAuth";
import { NavbarPortalAlumno } from "./NavbarPortalAlumno";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // the locale you want
registerLocale("es", es); // register it with the name you want


function FormAlumnos() {
    const auth = useAuth();
    const [rut, setRut] = useState("");
    const [datosAlumno, setDatosAlumno] = useState({
        NOMBRES: "",
        APELLIDO_PATERNO: "",
        APELLIDO_MATERNO: "",
        FECHA_NACIMIENTO: "",
        TELÉFONO: "",
        CORREO: "",
        FACULTAD: "",
        ESCUELA: "",
        CARRERA: "",
        REGIMEN: "",
        SEDE: "",
    });

    const handleChangeAlumno = (campo, valor) => {
        // Realiza la validación según el campo
        let newValue = valor;
        if (campo === 'TELÉFONO' ) {
            // Permitir solo números y máximo 9 caracteres
            newValue = valor.replace(/\D/g, '').slice(0, 9);
        }
    
        // Si el campo es SEDE, llama a la función handleChangeSede
        if (campo === 'SEDE') {
            handleChangeSede(valor);
        } else {
            // Actualiza los datos del alumno
            setDatosAlumno({ ...datosAlumno, [campo]: newValue });
        }
    };

    const [datosProfesor, setDatosProfesor] = useState({
        NOMBRES: "",
        APELLIDO_PATERNO: "",
        APELLIDO_MATERNO: "",
        TELÉFONO: "",
        CORREO: "",
        FACULTAD: "",
        ESCUELA: "",
        CARRERA: "",
    });

    const handleChangeProfesor = (campo, valor) => {
        // Realiza la validación según el campo
        let newValue = valor;
        if (campo === 'TELÉFONO') {
            // Permitir solo números y máximo 9 caracteres
            newValue = valor.replace(/\D/g, '').slice(0, 9);
        }
        // Actualiza los datos del profesor
        setDatosProfesor({ ...datosProfesor, [campo]: newValue });
    };

    const [datosEmpresaSupervisor, setDatosEmpresaSupervisor] = useState({
        NOMBRE: "",
        GIRO: "",
        DIRECCIÓN: "",
        TELÉFONO: "",
        PAGINA_WEB: "",
        NUM_COLABORADORES: "",
        AREA_DE_PRACTICA: "",
        NOMBRE_SUPERVISOR: "",
        CARGO_SUPERVISOR: "",
        CORREO_SUPERVISOR: "",
        TELEFONO_SUPERVISOR: "",
        FECHA_INICIO: "",
        FECHA_TERMINO: "",
    });

    const handleChangeSupervisor = (campo, valor) => {
        // Realiza la validación según el campo
        let newValue = valor;
        if (campo === 'TELÉFONO' || campo === 'TELEFONO_SUPERVISOR') {
            // Permitir solo números y máximo 9 caracteres
            newValue = valor.replace(/\D/g, '').slice(0, 9);
        }
        // Actualiza los datos del supervisor
        setDatosEmpresaSupervisor({ ...datosEmpresaSupervisor, [campo]: newValue });
    };

    useEffect(() => {
        setRut(auth.rut || localStorage.getItem("rut"));
    }, []);


    const handleCreate = async (e) => {
        e.preventDefault();

        const formData = {
            NOMBRES: datosAlumno.NOMBRES,
            APELLIDO_PATERNO: datosAlumno.APELLIDO_PATERNO,
            APELLIDO_MATERNO: datosAlumno.APELLIDO_MATERNO,
            FECHA_DE_NACIMIENTO: datosAlumno.FECHA_NACIMIENTO,
            TELÉFONO: datosAlumno.TELÉFONO,
            CORREO: datosAlumno.CORREO,
            FACULTAD: datosAlumno.FACULTAD,
            ESCUELA: datosAlumno.ESCUELA,
            CARRERA: datosAlumno.CARRERA,
            REGÍMEN: datosAlumno.REGÍMEN,
            SEDE: datosAlumno.SEDE,
            ...datosProfesor,
            ...datosEmpresaSupervisor,
            formalumnos: {
                profesor: {
                    NOMBRES: datosProfesor.NOMBRES,
                    APELLIDO_PATERNO: datosProfesor.APELLIDO_PATERNO,
                    APELLIDO_MATERNO: datosProfesor.APELLIDO_MATERNO,
                    TELÉFONO: datosProfesor.TELÉFONO,
                    CORREO: datosProfesor.CORREO,
                    FACULTAD: datosProfesor.FACULTAD,
                    ESCUELA: datosProfesor.ESCUELA,
                    CARRERA: datosProfesor.CARRERA,
                },
                empresaSupervisor: {
                    NOMBRE: datosEmpresaSupervisor.NOMBRE,
                    GIRO: datosEmpresaSupervisor.GIRO,
                    DIRECCIÓN: datosEmpresaSupervisor.DIRECCIÓN,
                    TELÉFONO: datosEmpresaSupervisor.TELÉFONO,
                    PAGINA_WEB: datosEmpresaSupervisor.PAGINA_WEB,
                    NUM_COLABORADORES: datosEmpresaSupervisor.NUM_COLABORADORES,
                    AREA_DE_PRACTICA: datosEmpresaSupervisor.AREA_DE_PRACTICA,
                    NOMBRE_SUPERVISOR: datosEmpresaSupervisor.NOMBRE_SUPERVISOR,
                    CARGO_SUPERVISOR: datosEmpresaSupervisor.CARGO_SUPERVISOR,
                    CORREO_SUPERVISOR: datosEmpresaSupervisor.CORREO_SUPERVISOR,
                    TELEFONO_SUPERVISOR: datosEmpresaSupervisor.TELEFONO_SUPERVISOR,
                    FECHA_INICIO: datosEmpresaSupervisor.FECHA_INICIO,
                    FECHA_TERMINO: datosEmpresaSupervisor.FECHA_TERMINO,
                },
            },
        };

      


        try {
            const res = await fetch(API + `/usuarios/subirFormulario/${rut}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.status === 200) {
                alert("Formulario subido correctamente");
                // Puedes redirigir a donde necesites después de subir el formulario
            } else {
                alert("Error al subir el formulario");
                console.log(res);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const getYearRange = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= currentYear - 100; i--) {
            years.push(i);
        }
        return years;
    };

    const capitalizeFirstLetter = (string) => {
        return string.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };
    const handleChange = (campo, valor) => {
        // Realiza la validación según el campo
        let newValue = valor;
        if (campo === 'TELÉFONO') {
            // Permitir solo números y máximo 9 caracteres
            newValue = valor.replace(/\D/g, '').slice(0, 9);
        }
        // Actualiza los datos del alumno
        setDatosAlumno({ ...datosAlumno, [campo]: newValue });
    };

    const [sedes, setSedes] = useState([
        "Santiago, Providencia",
        "Santiago, Santiago Centro",
        "Santiago, Maipú",
        "Santiago, La Florida",
        "Viña del Mar, Los Castaños",
        "Concepción, Chacabuco",
        "Concepción, El Boldal",
    ]);

    const handleChangeSede = (valor) => {
    // Actualiza los datos del alumno con el valor de la sede seleccionada
    setDatosAlumno({ ...datosAlumno, SEDE: valor });
};
    

    return (
        <Fragment>
            <NavbarPortalAlumno />
            <div className="container">

            <h4>Datos Alumno</h4>
            <div className="row">
                {Object.entries(datosAlumno).map(([campo, valor]) => (
                    <div key={campo} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <Form.Group className="mb-1">
                            <Form.Label className="mb-0">{capitalizeFirstLetter(campo)}</Form.Label>
                            {campo === 'FECHA_NACIMIENTO' ? (
                                <DatePicker
                                    selected={valor} // valor de fecha seleccionado
                                    onChange={(date) => {
                                        const fechaNacimientoTexto = format(date, 'MM/dd/yyyy', { locale: es }); // Convertir Date a texto con el formato deseado
                                        setDatosAlumno({ ...datosAlumno, [campo]: fechaNacimientoTexto });
                                    }}
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control"
                                    showYearDropdown // Mostrar el selector de año
                                    scrollableYearDropdown // Hacer que el selector de año sea desplazable
                                    yearDropdownItemNumber={100} // Mostrar 15 años a la vez
                                    yearDropdownItem={getYearRange()} // Rango de años desde el año actual hasta 100 años atrás
                                    maxDate={new Date()} // Establecer la fecha máxima como la fecha actual
                                    locale={es} // Establecer el locale español
                                />
                            ) : campo === 'SEDE' ? (
                                <Form.Select
                                    value={datosAlumno.SEDE}
                                    onChange={(e) => handleChangeAlumno('SEDE', e.target.value)}
                                >
                                    <option value="">Seleccione una sede</option>
                                    {sedes.map((sede, index) => (
                                        <option key={index} value={sede}>{sede}</option>
                                    ))}
                                    
                                </Form.Select>
                            ) : campo === 'REGIMEN' ? (
                                <Form.Select
                                    value={datosAlumno.REGIMEN}
                                    onChange={(e) => handleChangeAlumno('REGIMEN', e.target.value)}
                                >
                                    <option value="">Seleccione un régimen</option>
                                    <option value="diurna">Diurna</option>
                                    <option value="vespertina">Vespertina</option>
                                    <option value="Executive">Executive</option>
                                    <option value="Executive Online">Executive Online</option>
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    type={campo === 'TELÉFONO' ? "tel" : "text"}
                                    value={valor}
                                    onChange={(e) => handleChangeAlumno(campo, e.target.value)}
                                    pattern={campo === 'TELÉFONO' ? "[0-9]{9}" : undefined}
                                />
                            )}
                        </Form.Group>
                    </div>
                ))}
            </div>

            <h4>Datos Profesor</h4>
            <div className="row">
                {Object.entries(datosProfesor).map(([campo, valor]) => (
                    <div key={campo} className="col-sm-6 col-md-4 col-lg-3">
                        <Form.Group className="mb-1">
                        <Form.Label className="mb-0">{capitalizeFirstLetter(campo)}</Form.Label>
                            <Form.Control
                                type={campo === 'TELÉFONO' ? "tel" : "text"}
                                value={valor}
                                onChange={(e) => handleChangeProfesor(campo, e.target.value)}
                                pattern={campo === 'TELÉFONO' ? "[0-9]{9}" : undefined}
                            />
                        </Form.Group>
                    </div>
                ))}
            </div>
            <h4>Datos Supervisor</h4>
            <div className="row">
                {Object.entries(datosEmpresaSupervisor).map(([campo, valor]) => (
                    <div key={campo} className="col-sm-6 col-md-4 col-lg-3">
                        <Form.Group className="mb-3">
                        <Form.Label className="mb-0">{capitalizeFirstLetter(campo)}</Form.Label>
                            {campo === 'FECHA_TERMINO' ? (
                                <DatePicker
                                    selected={valor} // valor de fecha seleccionado
                                    onChange={(date) => {
                                        const fechaNacimientoTexto = format(date, 'MM-dd-yyyy', { locale: es }); // Convertir Date a texto con el formato deseado
                                        setDatosEmpresaSupervisor({ ...datosEmpresaSupervisor, [campo]: fechaNacimientoTexto });
                                    }}
                                    locale="es"
                                    dateFormat="MM-dd-yyyy"
                                    className="form-control"
                                    showYearDropdown // Mostrar el selector de año
                                    scrollableYearDropdown // Hacer que el selector de año sea desplazable
                                    yearDropdownItemNumber={100} // Mostrar 15 años a la vez
                                    yearDropdownItem={getYearRange()} // Rango de años desde el año actual hasta 100 años atrás
                                    preventOpenOnEnter 
                                />
                            ) : campo === 'FECHA_INICIO' ? (
                                <DatePicker
                                    selected={valor} // valor de fecha seleccionado
                                    onChange={(date) => {
                                        const fechaNacimientoTexto = format(date, 'MM-dd-yyyy', { locale: es }); // Convertir Date a texto con el formato deseado
                                        setDatosEmpresaSupervisor({ ...datosEmpresaSupervisor, [campo]: fechaNacimientoTexto });
                                    }}
                                    locale="es"
                                    dateFormat="MM-dd-yyyy"
                                    className="form-control"
                                    showYearDropdown // Mostrar el selector de año
                                    scrollableYearDropdown // Hacer que el selector de año sea desplazable
                                    yearDropdownItemNumber={100} // Mostrar 15 años a la vez
                                    yearDropdownItem={getYearRange()} // Rango de años desde el año actual hasta 100 años atrás
                                    preventOpenOnEnter 
                                />
                            ) : (
                                <Form.Control
                                    type={campo === 'TELÉFONO' ? "tel" : "text"}
                                    value={valor}
                                    onChange={(e) => handleChangeSupervisor(campo, e.target.value)}
                                    pattern={campo === 'TELÉFONO' ? "[0-9]{9}" : undefined}
                                />
                            )}
                        </Form.Group>
                    </div>
                ))}
            </div>
            <div>
                <Button variant="primary" onClick={(e) => handleCreate(e)}>
                    Guardar
                </Button>
            </div>
            </div>
            
        
        </Fragment>
    );
}

export { FormAlumnos };
