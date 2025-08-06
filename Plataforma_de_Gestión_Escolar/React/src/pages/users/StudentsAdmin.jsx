import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UsersBySchool = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jwt');

        const decoded = jwtDecode(token);
        const schoolId = decoded['School'];

        const res = await fetch(`${DynamicUrl}/users/shool/${schoolId}`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.data || []);
        } 
      } catch (err) {
        setError('Error al obtener los usuarios.', err);
      } 
    };

    fetchUsers();
  }, []);

  //  Aplicamos el filtro por rol
  const filteredUsers = users
  .filter((user) => user.role !== 'director') // excluye directores
  .filter((user) => !selectedRole || user.role === selectedRole); 


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Integrantes de la Escuela </h1>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Filtrar por rol:</label>
        <select
          className="w-full sm:w-64 px-3 py-2 border rounded-md text-gray-700 bg-white"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="student">Estudiante</option>
          <option value="teacher">Docente</option>
          
        </select>
      </div>
      { error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="space-y-4">
  {filteredUsers.map((user) => (
    <li
      key={user._id}
      className="border p-4 rounded-lg bg-white shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
    >
      <div className="w-full sm:w-auto">
        <p className="font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-600 break-all">{user.email}</p>
        <p className="text-sm text-gray-500 capitalize">Rol: {user.role}</p>
      </div>

      <div className="w-full sm:w-auto text-right">
        <Link
          to={`/Agregar_Curso_Usuario/${user._id}`}
          className="block sm:inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-200 text-center w-full sm:w-auto">
          Sus Cursos
        </Link>
      </div>
    </li>
  ))}
</ul>
      )}
    </div>
  );
};

export default UsersBySchool;
