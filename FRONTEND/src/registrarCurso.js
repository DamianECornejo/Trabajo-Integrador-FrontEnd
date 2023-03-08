import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

class InternalRegistrarCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      descripcion: '',
      anio: '',
      activo:''
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

      fetch(`http://localhost:8080/api/curso/${this.props.params.id}`, request)
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
              descripcion: result.body.descripcion,
              anio: result.body.anio,
              activo: result.body.activo,
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
        descripcion: '',
        anio: '',
        activo: ''
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
      descripcion: this.state.descripcion,
      anio: this.state.anio,
      activo: this.state.activo
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

    const url = this.props.params.id?`http://localhost:8080/api/curso/${this.props.params.id}`:"http://localhost:8080/api/curso";

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
          this.props.navigate("/cursolist");
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
          this.props.navigate("/cursolist");
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
          <h1>{this.props.params.id ? "Modificando " : "Creando Curso"}</h1>
          <form onSubmit={this.handleSubmit} method="POST">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripcion:</label>
              <input type="text" className="form-control" id="descripcion" name="descripcion" value={this.state.descripcion} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="anio" className="form-label">Año:</label>
              <input type="number" className="form-control" id="anio" name="anio" value={this.state.anio} onChange={this.handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="activo" className="form-label">Activo:</label>
              <input type="tinyint" className="form-control" id="activo" name="activo" value={this.state.activo} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" >
              <span className ="material-symbols-outlined center-align" >
              </span>
              <span>
                Guardar
              </span>
            </button> 
          </form>
        </div>
      </div>
    );
  }
}



export function RegistrarCurso(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalRegistrarCurso navigate={navigate} params={params} />
}

export default RegistrarCurso;