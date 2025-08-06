import { useState } from 'react';

const TypeFilter = ({ apiUrl, onResult }) => {
  const [type, setType] = useState('');

  const buscarPorType = () => {
    if (!type) return;

    fetch(`${apiUrl}/school/${type}/type`)
      .then(res => {
        return res.json();
      })
      .then(data => onResult(data)) 
      .catch(error => {
        console.error('Error al buscar por género:', error);
        onResult([]);
      });
  };

  const resetear = () => {
    setType('');
    fetch(`${apiUrl}/school`)
      .then(res => res.json())
      .then(data => onResult(data))
      .catch(err => console.error('Error al cargar todos los usuarios:', err));
  };

  return (
    <div className="flex gap-4 items-center mb-6">
      <select
        className="min-w-75 p-2 border border-gray-400 rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Tipo de institución</option>
        <option value="Pública">Pública</option>
        <option value="Privada">Privada</option>
        <option value="Subencionada">Subencionada</option>
        
      </select>

      <button
        onClick={buscarPorType}
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

export default TypeFilter;
