import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Pagina no encontrada</p>
            <div className="flexGrow">
                <Link to="/">Ir a Pagina Principal</Link>
            </div>
        </article>
    )
}

export {Missing}