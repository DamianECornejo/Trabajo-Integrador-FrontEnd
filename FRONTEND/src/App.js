import { BrowserRouter, Routes, Route, Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Menu from './Menu';
import Curso from './cursos/Curso';
import RegistrarAlumno from './registrarAlumno';
import Login from './usuario/login';
import AlumnoList from './alumno/alumnolist';
import CursoList from './cursos/cursolist';
import RegistrarCurso from './registrarCurso';
import AlumnoInscripto from './cursos/alumnoInscripto';



function App() {
  return (
    <BrowserRouter>
     <Menu />
    <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Curso" element={<Curso />} />
        <Route path="/registrarAlumno" element={<RegistrarAlumno />} />
        <Route path="/usuario/login" element={<Login />} />
        <Route path="/alumnolist" element={<AlumnoList />} />
        <Route path="/cursolist" element={<CursoList />} />
        <Route path="/registrarCurso" element={<RegistrarCurso />} />
        <Route path="/registrarCurso/:id" element={<RegistrarCurso />} />
        <Route path="/registrarAlumno/:id" element={<RegistrarAlumno />} />
        <Route path="/alumnoInscripto" element={<AlumnoInscripto />} />
      </Routes>
    </div>
    <ToastContainer />
  </BrowserRouter>
  );
}

export default App;
