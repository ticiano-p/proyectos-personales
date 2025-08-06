import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Footer = () => {
  const { userData } = useContext(AuthContext)
  const UserRole = userData?.role
  return (
    <footer class="bg-gray-900 text-white py-10 ">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
        <div>
          <h2 class="text-2xl font-bold tracking-wide">Pïccino / Dillon</h2>
          <p class="text-sm mt-2 text-gray-400">Educando con pasión, formando el futuro.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Enlaces</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>
              <Link className='hover:text-white transition' to={"/"}> Home </Link>
            </li>
            {
              ( !UserRole )
                ? <li>
                    <Link className='hover:text-white transition' to={"/Iniciar_Sesion"}> Iniciar Sesión </Link>
                  </li>
                : ""
            }
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contacto</h3>
          <p class="text-sm text-gray-300">📍 Av. Educación 123, CABA</p>
          <p class="text-sm text-gray-300">📞 (011) 1234-5678</p>
          <p class="text-sm text-gray-300">✉️ contacto@piccinodillon.edu.ar</p>
        </div>
      </div>
      <div class="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © 2025 Pïccino / Dillon. Todos los derechos reservados.
      </div>
    </footer>

  );
};

export default Footer;
