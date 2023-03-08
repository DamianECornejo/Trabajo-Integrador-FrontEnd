import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AlumnoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnoToDelete:{},
      modalConfirmarEliminacion:false,
      alumno: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose(){
    this.setState({
      modalConfirmarEliminacion: false
    });
  }
  handleOpen(id){
    this.setState({
      alumnoToDelete: id,
      modalConfirmarEliminacion: true
    });
  }

  onDelete() {
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization":sessionStorage.getItem('token')
      }
    };

    fetch(`http://localhost:8080/api/alumno/${this.state.alumnoToDelete}`, request)
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
          toast.success(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          this.componentDidMount();
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
      });
  }

  componentDidMount() {
    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization":sessionStorage.getItem('token')
      }
    };
    fetch("http://localhost:8080/api/alumno",request)
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
      return (
        <tr key={index}>
          <td>{alumno.nombre}</td>
          <td>{alumno.apellido}</td>
          <td>{alumno.dni}</td>
          <td>
            <Link to={`/registrarAlumno/${alumno.id}`}>
              <button className="btn btn-primary">
                <span className="material-symbols-outlined">
                  edit
                </span>
              </button>
            </Link>
            <button type="submit" className="btn btn-danger" onClick={() => this.handleOpen(alumno.id)}>
              <span className="material-symbols-outlined center-align">
                Eliminar
              </span>
              <span>
              </span>
            </button>
          </td>
        </tr>
      )
    });



    return (
      <>
        <h1>Lista de alumno</h1>
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
        </table>


        <Modal
          show={this.state.modalConfirmarEliminacion}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="dark-content">
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta seguro que desea eliminarlo
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={this.onDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>
        <Link to="/registrarAlumno"  className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Añadir Alumno</Link>
      </>

    );
  }
}

export default AlumnoList;