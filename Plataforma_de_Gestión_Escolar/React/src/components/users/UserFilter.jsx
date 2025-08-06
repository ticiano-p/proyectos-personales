import { useState } from 'react';

const UserFilter = ({ apiUrl, onResult }) => {
  const [email, setEmail] = useState('');

  const buscarPorEmail = () => {
    if (!email.trim()) return;

    fetch(`${apiUrl}/users/${email}/email`)
      .then(res => {
        if (!res.ok) throw new Error("Usuario no encontrado");
        return res.json();
      })
      .then(data => onResult([data]))
      .catch(error => {
        console.error('Error al buscar usuario:', error);
        onResult([]); // Vaciamos resultados si no se encuentra
      });
  };

  const obtenerTodos = () => {
    fetch(`${apiUrl}/users`)
      .then(res => res.json())
      .then(data => onResult(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  };

  return (
    <div className="flex gap-4 items-center mb-6">
      <input
        type="serch"
        placeholder="Buscar por email"
        className="min-w-75 p-2 border border-gray-400 rounded w-[250px]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={buscarPorEmail}
        className="min-w-25 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>
      <button
        onClick={() => {
          setEmail('');
          obtenerTodos();
        }}
        className="min-w-25 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Ver Todos
      </button>
    </div>
  );
};

export default UserFilter;
