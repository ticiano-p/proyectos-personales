import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <ul className="flex space-x-6 justify-center items-center m-0">
      <li className="flex items-center">
      <Link to="/" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200">
          Home
      </Link>
      </li>
      <li className="flex items-center">
      <Link to="/Iniciar_Sesion" className="text-gray-300 text-xl hover:text-gray-100 transition duration-200">
          Iniciar Sesion
      </Link>
      </li> 
    </ul>
  )
}

export default NavBar