import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const Userlogin = () => {
  const [users, setUsers] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!users.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(users.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!users.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (users.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${DynamicUrl}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al autenticar');
      }

      const result = await response.json();
      login(result.jwt);

      navigate('/');
    } catch (error) {
      alert('Tenemos un error al loguear al usuario: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
   <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-3 py-8 space-y-6">
    <div className="flex justify-center">
      <img
        src="Logo.png"
        alt="Logo Login"
        className="w-32 h-32 rounded-3xl shadow-md border border-gray-200"
      />
    </div>
    <h1 className="text-3xl font-bold text-gray-800 text-center">Iniciar sesión</h1>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
          Correo electrónico
        </label>
        <input
          name="email"
          type="email"
          value={users.email}
          onChange={handleChange}
          placeholder="nombre@ejemplo.com"
          className={`w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
            errors.email
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          value={users.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={`w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
            errors.password
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
        />
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
      >
        Ingresar
      </button>
    </form>
    <p className="text-sm text-center text-gray-600">
      ¿No tienes cuenta? 
      <Link to={"/Crear_Usuario"} className="text-blue-600 font-medium ml-2 hover:underline">
          Registrate aquí
      </Link>
    </p>
  </div>
</div>

  );
};

export default Userlogin;
