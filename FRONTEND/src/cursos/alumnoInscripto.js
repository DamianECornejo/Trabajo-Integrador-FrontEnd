import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AlumnoInscripto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alumno: [],
            alumno_curso: []
        };

       
    }


    onDelete(alumno) {
        let alumno_curso = [...this.state.alumno_curso];
       alumno_curso.splice(alumno_curso.indexOf(alumno.id), 1)
        this.setState({
            alumno_curso: alumno_curso
        });
    }

    onAdd(alumno) {
        let alumno_curso = [...this.state.alumno_curso];
        alumno_curso.push(alumno.id);
        this.setState({
            alumno_curso: alumno_curso
        });
    }




    componentDidMount() {
        let id_curso = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                "authorization": sessionStorage.getItem('token')
            }
        };
        fetch("http://localhost:8080/api/alumno_curso", id_curso)
        .then(res => {
            return res.json().then(body => {
                return {
                    status: res.status,
                    ok: res.ok,
                    headers: res.headers,
                    body: body
                };
            });
        })

        this.setState({ id_curso: id_curso});

        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json',
                "authorization": sessionStorage.getItem('token')
            }
        };
        fetch("http://localhost:8080/api/alumno", request)
            .then(res => {
                return res.json().then(body => {
                    return {
                        status: res.status,
                        ok: res.ok,
                        headers: res.headers,
                        body: body
                    };
                });
            })


            .then(result => {
                if (result.ok) {
                    this.setState({
                        modalConfirmarEliminacion: false,
                        alumno: result.body
                    });
                } else {
                    toast.error(result.body.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            },

                (error) => {
                    console.log(error);
                    this.setState({
                        error,
                        alumno: [],
                        modalConfirmarEliminacion: false
                    });
                }
            )
    }
    render() {
        let rowsTable = this.state.alumno.map((alumno, index) => {
            let inscripto = this.state.alumno_curso.indexOf(alumno.id) != -1;
            return (
                <tr key={index} className={inscripto ? "table-primary" : ""}>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apellido}</td>
                    <td>{alumno.dni}</td>
                    <td>
                        {inscripto &&
                            <button type="submit" className="btn btn-danger" onClick={() => this.onDelete(alumno)}>
                                <span className="material-symbols-outlined center-align">
                                    Eliminar
                                </span>
                                <span>
                                </span>
                            </button>
                        }
                        {!inscripto &&
                            <button type="submit" className="btn btn-primary" onClick={() => this.onAdd(alumno)}>
                                <span className="material-symbols-outlined center-align">
                                    Añadir
                                </span>
                                <span>
                                </span>
                            </button>
                        }
                    </td>
                </tr>
            )
        });



        return (
            <>
                <h1>Lista de alumno</h1>
                <h2>Curso: </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsTable}
                    </tbody>
                    <Button variant="secondary" onClick={this.onAdd}>
              Guardar
            </Button>
                </table>


            </>

        );
    }
}

export default AlumnoInscripto;