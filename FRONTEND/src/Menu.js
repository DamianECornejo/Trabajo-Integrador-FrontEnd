import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


function Menu() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    const intervalId = setInterval(() => {
        let t = sessionStorage.getItem('token');
        if (t !== token) {
            setToken(t);
        }
    }, 1000);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    });

    function salir() {
        console.log("salir");
        sessionStorage.removeItem("token");
        setToken("");
        //navigate("/"); 
    }

    if (token !== "" && token !== null) {
        var decoded = jwt_decode(token);
        return <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src="/logo.png" className="nav-img-main" width="30" height="30" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/cursolist" className="nav-link">Listas de cursos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/alumnolist" className="nav-link">Listas de alumnos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/alumnoInscripto" className="nav-link">Alumnos Inscripto</Link>
                            </li>


                            <Link to="/">
                                <a className="navbar-nav ml-aut" onClick={() => salir()} >
                                    <Button variant="danger">Cerrar Sección</Button>
                                </a>
                            </Link>


                        </ul>
                    </div>

                </div>
            </nav>
        
        </>
    } else {
        return <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <Link to="/" className="navbar-brand" >
                    <img src="/logo.png" className="nav-img-main" width="50" height="50" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Curso" className="nav-link">Cursos</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Button href="/usuario/login">Iniciar Sección</Button>{' '}

                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    }

}


export default Menu;