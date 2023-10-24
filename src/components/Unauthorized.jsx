import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br/>
            <p>Usted no tiene permisos para acceder a esta página</p>
            <div className="flexGrow">
            <button onClick={goBack}>Volver</button>
            </div>
        </section>
    )
}

export {Unauthorized};