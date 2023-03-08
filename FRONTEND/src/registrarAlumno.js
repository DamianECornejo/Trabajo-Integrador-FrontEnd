import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

class InternalRegistrarAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      id: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.params.id) {
      let request = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          "authorization":sessionStorage.getItem('token')
        }
      };

      fetch(`http://localhost:8080/api/alumno/${this.props.params.id}`, request)
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
              nombre: result.body.nombre,
              apellido: result.body.apellido,
              dni: result.body.dni

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
        })
    } else {
      this.setState({
        nombre: '',
        apellido: '',
        dni: ''
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      dni: this.state.dni
    };

    let request = {
      method: this.props.params.id ? 'PUT' : 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization":sessionStorage.getItem('token')
      }
    };

    const url = this.props.params.id ? `http://localhost:8080/api/alumno/${this.props.params.id}` : "http://localhost:8080/api/alumno";

    fetch(url, request)
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
          this.props.navigate("/alumnolist");
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
          this.props.navigate("/alumnolist");
        }
      },
        (error) => {
          console.log(error);
        }
      );
  }
  
  render() {
    return (
      <div className="row">
        <div className="col">
          <h1>{this.props.params.id ? "Modificando " + this.state.apellido : "Creando Alumno"}</h1>
          <form onSubmit={this.handleSubmit} method="POST">
           
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido:</label>
              <input type="text" className="form-control" id="apellido" name="apellido" value={this.state.apellido} onChange={this.handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="dni" className="form-label">DNI</label>
              <input type="number" className="form-control" id="dni" name="dni" value={this.state.dni} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" >
              <span className="material-symbols-outlined center-align" >
                Guardar
              </span>
            </button> 
          </form>
        </div>
      </div>
    );
  }
}

    //<h1>{this.props.params.id ? "Modificando " + this.state.nombre + this.state.apellido : "Creando alumno"}</h1>
    //<Form onSubmit={this.handleSubmit} method="POST"></Form>



export function RegistrarAlumno(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalRegistrarAlumno navigate={navigate} params={params} />
}

export default RegistrarAlumno;