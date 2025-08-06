import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

const NavBarAdmin = ({ handleLogout }) => {
  let role = '';

  try {
    const token = localStorage.getItem('jwt');
    const decoded = jwtDecode(token);
    role = decoded['role'];
  } catch (err) {
    console.error('Token inválido o ausente', err);
  }
  return (
    <ul className="flex space-x-6 justify-center items-center m-0">
      <li className="flex items-center">
        <Link to="/" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200 ">
          Home
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="/Curso" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200 ">
          Curso
        </Link>
      </li>
      {role === 'director' && (
        <li className="flex items-center">
          <Link to="/Estudiantes" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200">
            Estudiantes
          </Link>
        </li>
      )}
      <li className="flex items-center">
        <Link to="/Comunicados" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200 ">
          Notificaciones
        </Link>
      </li>
      <li>
        <button
          onClick = { handleLogout }
          className="text-gray-300 text-xl hover:text-gray-100 transition duration-200  cursor-pointer"
        >
          Cerrar Sesion
        </button>
      </li>
    </ul>
  )
}

export default NavBarAdmin