import { useState } from 'react';

const GenderFilter = ({ apiUrl, onResult }) => {
  const [gender, setGender] = useState('');

  const buscarPorGenero = () => {
    if (!gender) return;

    fetch(`${apiUrl}/users/${gender}/gender`)
      .then(res => {
        if (!res.ok) throw new Error("No se encontraron usuarios con ese género");
        return res.json();
      })
      .then(data => onResult(data)) 
      .catch(error => {
        console.error('Error al buscar por género:', error);
        onResult([]);
      });
  };

  const resetear = () => {
    setGender('');
    fetch(`${apiUrl}/users`)
      .then(res => res.json())
      .then(data => onResult(data))
      .catch(err => console.error('Error al cargar todos los usuarios:', err));
  };

  return (
    <div className="flex gap-4 items-center mb-6">
      <select
        className="min-w-75 p-2 border border-gray-400 rounded"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Seleccionar género</option>
        <option value="Male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="Other">Otro</option>
      </select>

      <button
        onClick={buscarPorGenero}
        className="min-w-25 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Filtrar
      </button>

      <button
        onClick={resetear}
        className="min-w-25 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Ver Todos
      </button>
    </div>
  );
};

export default GenderFilter;
