import {  useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const NewCurso = () => {
  const [course, setCourses] = useState({
    titulo: '',
    descripcion: '',
    schoolId:''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!course.titulo) {
      newErrors.titulo = 'El titulo es obligatorio';
    } 
    if (!course.descripcion) {
      newErrors.descripcion = 'La descripcion es obligatoria';
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
    const token = localStorage.getItem('jwt');
      const decoded = jwtDecode(token);
      const schoolId = decoded['School']; // Asegurate que se llame así en el token

      const newCourse = {
        ...course,
        schoolId 
      };
       await fetch(`${DynamicUrl}/courses/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      
      navigate('/Curso');
    } catch (error) {
      alert('Tenemos un error al Crear el Curso ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourses((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    
   <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
  
  <div className=" w-full max-w-md bg-white rounded-2xl shadow-lg px-3 py-8 space-y-6">
    
    <div className="flex justify-center">
      
    </div>
    <h1 className="text-3xl font-bold text-gray-800 text-center">Nuevo curso</h1>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-1">
          Titulo
        </label>
        <input
          name="titulo"
          type="text"
          value={course.titulo}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
            errors.titulo
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
        />
        {errors.titulo && <p className="text-xs text-red-500 mt-1">{errors.titulo}</p>}
      </div>
      <div>
        <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-1">
          Descripcion
        </label>
        <input
          name="descripcion"
          type="text"
          value={course.descripcion}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
            errors.descripcion
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
        />
        {errors.descripcion && <p className="text-xs text-red-500 mt-1">{errors.descripcion}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
      >
        Ingresar
      </button>
    </form>
    
  </div>
</div>

  );
};

export default NewCurso;
