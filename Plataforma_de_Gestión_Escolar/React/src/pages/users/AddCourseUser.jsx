import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const AssignCoursesToUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const decoded = jwtDecode(token);
      const schoolId = decoded['School'];
     // trae los cursos de la escuela
      const resCourses = await fetch(`${DynamicUrl}/courses/escuela/${schoolId}`);
      const dataCourses = await resCourses.json();
      setCourses(dataCourses.data || []);
     // trae los cursos del usuario
      const resUserCourses = await fetch(`${DynamicUrl}/users/${id}/courses`);
      const dataUserCourses = await resUserCourses.json();

      const assignedCourseIds = dataUserCourses.data
        ? dataUserCourses.data.map(course => course._id)
        : [];
      setSelectedCourses(assignedCourseIds);
      
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    // le asigna los cursos
      await fetch(`${DynamicUrl}/users/${id}/assign-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseIds: selectedCourses })
      });
        navigate('/Estudiantes')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 my-8 max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg space-y-6">
  <h1 className="text-3xl font-bold text-blue-700">Asignar Cursos al Usuario</h1>

  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Cursos disponibles:
      </label>
      <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-300 bg-gray-50 p-3 space-y-2 custom-scroll">
        {courses.map((course) => (
          <label
            key={course._id}
            className="flex items-center gap-3 p-2 bg-white hover:bg-blue-50 rounded-lg transition cursor-pointer shadow-sm"
          >
            <input
              type="checkbox"
              value={course._id}
              checked={selectedCourses.includes(course._id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedCourses((prev) =>
                  checked ? [...prev, course._id] : prev.filter((id) => id !== course._id)
                );
              }}
              className="h-5 w-5 text-blue-600 accent-blue-600"
            />
            <span className="text-gray-800 font-medium">{course.titulo}</span>
          </label>
        ))}
      </div>
    </div>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
    >
      Asignar Cursos
    </button>
  </form>
</div>

  );
};

export default AssignCoursesToUser;
