import  {  useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UserPostFormEdit = () => {

  const {id}= useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState({
    
    firstName:'',
    lastName:'',
    gender: '',
    birthDate:'',
    dni:'',
    email:'',
    address:'',
    phone:'',
    
    active: true,
    role: '',
    school_id: '',
  });
  const [schools, setSchools] = useState([]);
// Cargar los datos actuales
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`${DynamicUrl}/users/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener el usuario');
        const data = await response.json();
         setUsers(prev => ({
        ...prev,
        ...data,
        birthDate: data.birthDate ? data.birthDate.split('T')[0] : '',
        school_id: data.school_id || '',
      }));
       
      } catch (error) {
        console.error('Error al cargar los datos de el usuario:', error);
      }
      
    };
    fetchSchoolData();
  }, [id]);
  useEffect(() => {
  fetch(`${DynamicUrl}/school`)
    .then(response => response.json())
    .then(data => setSchools(data))  // guardás directo el arreglo de escuelas
    .catch(error => console.error('Error al cargar escuelas:', error));
}, []);
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

    if (users.phone && !/^\+?\d{7,15}$/.test(users.phone)) newErrors.phone = 'Teléfono no válido';

    if (!users.role) newErrors.role = 'El rol es obligatorio';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
   const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  const cleanedUsers = { ...users };
  delete cleanedUsers.courses; // Elimina el campo 

  const formData = new FormData();
  // Agregamos todos los campos menos file
  Object.entries(cleanedUsers).forEach(([key, value]) => {
    if (key !== 'file' && value !== undefined) {
      formData.append(key, value);
    }
  });
  if (users.file) {
    formData.append('file', users.file);
  }
  fetch(`${DynamicUrl}/users/${id}`, {
    method: 'PUT',
    body: formData,
  })
    .then(() => {
      navigate('/Lista_Usuarios');
    })
    .catch((error) => {
      console.error('Error al enviar los datos:', error);
    });
};
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  return (
    <div className="user-container bg-gray-100 py-4">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4" >
      <h2 className="text-2xl font-bold text-center"> Editar Usuario</h2>
  <div className="flex flex-col items-center gap-4 mb-6">
  <div className="text-center">
    <p className="text-sm font-semibold text-gray-600 mb-2">Foto actual:</p>
    {users.file && (
      <img
        src={`${DynamicUrl}/uploads/${users.file}`}
        alt="Foto del usuario"
        className="w-32 h-32 rounded-full shadow border"
      />
    )}
  </div>

  <div className="w-full max-w-sm text-center">
    <label className="block text-sm font-medium text-gray-700 mb-2">Subir nueva foto</label>
    <input
      type="file"
      name="file"
      accept="image/*"
      onChange={e => setUsers(prev => ({ ...prev, file: e.target.files[0] }))}
      className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
    />
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input name="firstName" type="text" placeholder="Nombre" value={users.firstName} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>

          <input name="lastName" type="text" placeholder="Apellido" value={users.lastName} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  />
{errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genero</label>
           <select name="gender" value={users.gender} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2" >
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Other">Otro</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
         <input name="birthDate" type="date" value={users.birthDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  />
         {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
         <input name="dni" type="text" placeholder="DNI" value={users.dni} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  /> 
         {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input name="email" type="email" placeholder="Email" value={users.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
          <input name="address" type="text" placeholder="Dirección" value={users.address} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
          <input name="phone" type="tel" placeholder="Teléfono" value={users.phone} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"  />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select name="role" value={users.role} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2" >
          <option value="student">Estudiante</option>
          <option value="parent">Padre</option>
          <option value="teacher">Profesor</option>
          <option value="director">director</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Escuela</label>
          
          <select
            name="school_id"
            value={users.school_id}
            onChange={handleChange}
            className="input"
          >
            <option value="">Seleccionar escuela</option>
            {schools.map((school) => (
              <option key={school._id || school.id} value={school._id || school.id}>
                {school.name || school.schoolName}
              </option>
            ))}
          </select>
          </div>
          
  

</div>
         
     
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
        Enviar
      </button>
    </form>
      
    </div>
  );
};

export default UserPostFormEdit;
