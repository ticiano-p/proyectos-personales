import  {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UserPostForm = () => {
  const [users, setUsers] = useState({
    firstName:'',
    lastName:'',
    gender: '',
    birthDate:'',
    dni:'',
    email:'',
    address:'',
    phone:'',
    password:'',
    active: true,
    role: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = () =>{
    const newErrors = {};
    if (!users.firstName) newErrors.firstName = 'El nombre es obligatorio';
    if (!users.lastName) newErrors.lastName = 'El apellido es obligatorio';
    if (!users.address) newErrors.address = 'La dirección es obligatoria';
    if (!users.gender) newErrors.gender = 'El género es obligatorio';

    if (!users.birthDate) newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    else if (new Date(users.birthDate) > new Date()) newErrors.birthDate = 'La fecha no es valida';
if (!users.dni) newErrors.dni = 'El DNI es obligatorio';
    else if (!/^\d{7,}$/.test(users.dni)) newErrors.dni = 'El DNI debe tener al menos 7 números';

    if (!users.email) newErrors.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(users.email)) newErrors.email = 'El email no es válido';

    if (!users.password) newErrors.password = 'La contraseña es obligatoria';
    else if (users.password.length < 4) newErrors.password = 'Debe tener al menos 4 caracteres';

    if (users.phone && !/^\+?\d{7,15}$/.test(users.phone)) newErrors.phone = 'Teléfono no válido';

    if (!users.role) newErrors.role = 'El rol es obligatorio';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
   const handleSubmit = async  (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
    fetch(`${DynamicUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users), 
      });
      alert("Usuario registrado correctamente")
      navigate('/');
    } catch (error) {
      alert('Error al registrar usuario: ' + error.message);
    }
  }
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
  <div className="flex flex-col items-center w-full max-w-4xl bg-white p-8 my-12 rounded-2xl shadow-lg space-y-6">
    <div className="flex flex-col justify-center items-center">
      <img
        src="Logo.png"
        alt="Logo Login"
        className="w-32 h-32 rounded-3xl shadow-md border border-gray-200"
      />
      <h2 className="text-3xl font-bold text-gray-800">Registrarse</h2>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            name="firstName"
            type="text"
            value={users.firstName}
            onChange={handleChange}
            className={`bg-gray-50 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
            placeholder='Leonardo'
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input
            name="lastName"
            type="text"
            value={users.lastName}
            onChange={handleChange}
           className={`bg-gray-50 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
          placeholder='Dillon'
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <select
                name="gender"
                value={users.gender}
                onChange={handleChange}
                className={`bg-gray-50 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.gender ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                }`}
              >
                <option value="">Seleccionar género</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
          <input
            name="birthDate"
            type="date"
            value={users.birthDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.birthDate ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
            
          />
          {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
          <input
            name="dni"
            type="text"
            value={users.dni}
            onChange={handleChange}
            placeholder='45781245'
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.dni ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
            
          />
          {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={users.email}
            onChange={handleChange}
            placeholder='mailEjemplo@gmail.com'
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
          />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input
            name="address"
            type="text"
            value={users.address}
            placeholder='Una Dirección valida'
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
            
          />
           {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            name="phone"
            type="tel"
            value={users.phone}
            onChange={handleChange}
            placeholder='1245365874'
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
            
          />
           {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            name="password"
            type="password"
            value={users.password}
            placeholder='***********'
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                  }`}
            
          />
                     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            name="role"
            value={users.role}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 border-gray-300'
                }`}
            
          >
            <option value="">Seleccionar rol</option>
            <option value="student">Estudiante</option>
            <option value="parent">Padre</option>
            <option value="teacher">Profesor</option>
            <option value="director">Director</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}

        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  </div>
</div>

  );
};

export default UserPostForm;
