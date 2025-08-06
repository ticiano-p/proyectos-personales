import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const EditCurso = () => {
  const { course_id } = useParams(); 
  const [course, setCourses] = useState({
    titulo: '',
    descripcion: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!course.titulo) newErrors.titulo = 'El título es obligatorio';
    if (!course.descripcion) newErrors.descripcion = 'La descripción es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cargar datos del curso existente
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${DynamicUrl}/courses/${course_id}`);
        const data = await res.json();
        setCourses({
          titulo: data.titulo || '',
          descripcion: data.descripcion || ''
        });
      } catch (err) {
        alert('Error al cargar los datos del curso.', err);
      }
    };
    fetchCourse();
  }, [course_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      



      await fetch(`${DynamicUrl}/courses/${course_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });

      navigate('/Curso');
    } catch (error) {
      alert('Error al editar el curso: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourses(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-3 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Editar curso</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-1">
              Título
            </label>
            <input
              name="titulo"
              type="text"
              value={course.titulo}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
                errors.titulo ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.titulo && <p className="text-xs text-red-500 mt-1">{errors.titulo}</p>}
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-1">
              Descripción
            </label>
            <input
              name="descripcion"
              type="text"
              value={course.descripcion}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${
                errors.descripcion ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.descripcion && <p className="text-xs text-red-500 mt-1">{errors.descripcion}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCurso;
