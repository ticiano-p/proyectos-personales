import { Link } from "react-router-dom"

const NavBarAdmin = ({ handleLogout }) => {
  return (
    <ul className="flex space-x-6 justify-center items-center m-0">
      <li className="flex items-center">
        <Link to="/" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200">
            Home
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="/Lista_Usuarios" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200">
            Usuarios Registrados
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="/Lista_Escuela" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200">
            Escuelas Registradas
        </Link>
      </li>
      <li>
        <button
          onClick = { handleLogout }
          className="text-gray-300 text-xl hover:text-gray-100 transition duration-200 cursor-pointer"
        >
          Cerrar Sesion
        </button>
      </li>
    </ul>
  )
}

export default NavBarAdmin