import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class cursoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursoToDelete:{},
      modalConfirmarEliminacion:false,
      curso: []
    };
    this.onDeleteCurso = this.onDeleteCurso.bind(this);
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
      cursoToDelete: id,
      modalConfirmarEliminacion: true
    });
  }

  onDeleteCurso(){
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization":sessionStorage.getItem('token')
      }
    };

    fetch(`http://localhost:8080/api/curso/${this.state.cursoToDelete}`, request)
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
    fetch("http://localhost:8080/api/curso",request)
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
          curso: result.body
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
            curso: [],
            modalConfirmarEliminacion: false
          });
        }
      )
  }

  render() {
    let rowsTable = this.state.curso.map((curso, index) => {
      return (
        <tr key={index}>
          <td>{curso.nombre}</td>
          <td>{curso.descripcion}</td>
          <td>{curso.anio}</td>
          <td>{curso.activo}</td>
          <td>
          <Link to={`/registrarCurso/${curso.id}`}>
          <button className="btn btn-primary">
              <span className="material-symbols-outlined">
                edit
              </span>
            </button>
          </Link>
          <button type="submit" className="btn btn-danger" onClick={()=>this.handleOpen(curso.id)}>
              <span className="material-symbols-outlined center-align">
                delete_forever
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
        <h1>Lista de curso</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Año</th>
              <th>Activo</th>
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
            <Button variant="primary" onClick={this.onDeleteCurso}>Eliminar</Button>
          </Modal.Footer>
        </Modal>
        <Link to="/registrarCurso"  className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Añadir Curso</Link>
      </>

    );
  }
}

export default cursoList;