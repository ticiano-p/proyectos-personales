import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import '../../../public/editor.css'; 


const DynamicUrl = import.meta.env.VITE_DynamicUrl;


const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
 const [isDirector, setIsDirector] = useState(false);
  // Cargar todos los usuarios al inicio 
  useEffect(() => {   
     const token = localStorage.getItem('jwt');
     const decoded = jwtDecode(token);
     const role = decoded['role']
      if (role === 'director') {
      setIsDirector(true);
    }
    
      const schoolId = decoded['School'];  
       if (!schoolId) {
        setErrorMsg('No estás asociado a ninguna escuela.');
        return;
      }                
    fetch(`${DynamicUrl}/announcement/${schoolId}`)
      .then(res => res.json())
        //ordena de mas nuevo a mas viejo
      .then(data => { 
        const sorted = data.data.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
  setAnnouncements(sorted);
})

      .catch(err => console.error('Error inicial:', err));
  }, []);

  const handleDelete = async (id) => {
  if (!confirm("¿Estás seguro de que querés eliminar este comunicado?")) return;
  try {
    const token = localStorage.getItem('jwt');
    fetch(`${DynamicUrl}/announcement/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
      setAnnouncements((prev) => prev.filter(item => item._id !== id));
    
  } catch (error) {
    console.error("Error en la petición DELETE:", error);
  }
};
  
  return (
    <div>
      <div className="flex justify-between items-center my-4 mx-4">
        <h1 className="text-2xl font-bold">Lista de Comunicados</h1>
        {isDirector && (
          <Link
          to={`/Crear_Comunicados`}
          className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Agregar Comunicado
            </Link>
          )}
          </div>
          <hr/>
          <section className="space-y-4 my-6">
            {errorMsg ? (
          <p className="text-red-600 text-center">{errorMsg}</p>
        ) : announcements.length > 0 ? (
          announcements.map((notification) => (
            <div>
              <div key={notification._id} className="shadow-md bg-white rounded-xl border border-gray-200 px-5  py-2 transition hover:shadow-lg">
              <div className="HTMLForzado max-w-none text-gray-800 mb-2"
                  dangerouslySetInnerHTML={{ __html: notification.message }}></div>
              <p className="text-sm text-gray-500">
                Publicado el: {new Date(notification.create_at).toLocaleString()}
              </p>
              {isDirector && (
              <div>
                <hr className=" border-gray-300" />
                <div className="flex justify-end gap-3">
                  <Link to={`/Editar_Comunicado/${notification._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Editar
                  </Link>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"  onClick={() => handleDelete(notification._id)}>Eliminar</button>
                </div>
              </div>
              )}
            </div>
            </div>
            
            
          ))
        ) : (
          <p className="text-gray-500 text-center">No se encontraron anuncios.</p>
        )}
      </section>

      
    </div>
  );
};

export default AnnouncementList;