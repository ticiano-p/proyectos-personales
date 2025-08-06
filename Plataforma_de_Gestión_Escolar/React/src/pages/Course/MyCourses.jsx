import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;
const gradients = [
  'from-blue-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-pink-500 to-rose-600',
];
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decoded = jwtDecode(token);
    const userId = decoded['id'];
    const role = decoded['role']
    const school = decoded['School']
    setRole(role);
    try {
      const endpoint = role === 'director' 
          ? `${DynamicUrl}/courses/escuela/${school}` // Obtener todos los cursos
          : `${DynamicUrl}/users/${userId}/courses`; // Solo los del usuario
      fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          if (data.data && data.data.length > 0) {
            setCourses(data.data);
          } 
        })
        .catch(err => {
          console.error('Error al obtener cursos:', err);
          setError('Error al cargar los cursos.');
        });

    } catch (err) {
      console.error('Token inválido:', err);
      setError('Token inválido.');
    }
  }, []);

const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      fetch(`${DynamicUrl}/courses/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al eliminar');
          // Actualiza la lista después de eliminar
          setCourses(prev => prev.filter(course => course._id !== id));
        })
        .catch(err => {
          console.error('Error al eliminar el curso:', err);
          alert('Error al eliminar el curso.');
        });
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Cursos:</h1>
        {role === 'director' && (
          <Link
            to="/NuevoCurso"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Nuevo curso
          </Link>
        )}
      </div>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : courses.length > 0 ? (
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div
              key={course._id}
              className="block rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition transform hover:scale-[1.01]"
            >
              <Link to={`/Comunicados-Curso/${course._id}`}>
                <div
                  className={`p-6 text-white bg-gradient-to-r ${
                    gradients[index % gradients.length]
                  }`}
                >
                  <h2 className="text-xl font-bold">{course.titulo}</h2>
                  <p className="text-sm mt-1 opacity-90">{course.descripcion}</p>
                </div>
              </Link>

              <div className="p-4 bg-white flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">Ver comunicados →</span>
                {role === 'director' && (
                  <div>
                    <Link
                    to={`/EditCurso/${course._id}`}
                    className="text-green-600 hover:text-green-800 text-sm mx-4">
                      Editar
                    </Link>
                   <button
                    onClick={() => handleEliminar(course._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Eliminar Curso
                  </button> 
                  
                  </div>
                  
                  
                )}
              </div>
            </div>
          ))}
        </div>
      ): (
      <div className="flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg p-10  shadow-sm">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM9 13.5h6m3.75-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
            />
         </svg>
         <h3 className="text-lg font-semibold text-gray-700 mb-1">Sin cursos asignados</h3>
         <p className="text-sm text-gray-500 text-center max-w-sm">
          Aún no te han asignado ningún curso. Cuando te asignen alguno, aparecerá aquí. 

          </p>
      </div>
       )}
    </div>

  );
};

export default MyCourses;
