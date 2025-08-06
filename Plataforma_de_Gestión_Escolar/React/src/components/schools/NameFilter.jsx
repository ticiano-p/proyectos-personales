import { useState } from 'react';

const FirstNameFilter =({apiUrl, onResult })=>{
  const [name, setName] = useState('');

  const buscarPorName = () => {
    if (!name.trim()) return;
    fetch(`${apiUrl}/school/${name}/name`)
      .then(res => {
        return res.json();
      })
      .then(data => onResult(data))
      .catch(error => {
        console.error('Error al buscar usuario:', error);
        onResult([]); // Vaciamos resultados si no se encuentra
      });
  };
  const obtenerTodos = () => {
    fetch(`${apiUrl}/school`)
      .then(res => res.json())
      .then(data => onResult(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  };
   return (
    <div className="flex gap-4 items-center mb-6">
      <input
        type="search"
        placeholder="Buscar por nombre"
        className="min-w-75 p-2 border border-gray-400 rounded w-[250px]"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={buscarPorName}
        className="min-w-25 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buscar
      </button>
      <button
        onClick={() => {
          setName('');
          obtenerTodos();
        }}
        className="min-w-25 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Ver Todos
      </button>
    </div>
  );
}
export default FirstNameFilter;