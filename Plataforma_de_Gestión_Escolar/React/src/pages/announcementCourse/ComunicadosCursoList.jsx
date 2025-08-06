import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useParams  } from 'react-router-dom';
import '../../../public/editor.css'; 


const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
 const [isDirector, setIsDirector] = useState(false);
  // Cargar todos los usuarios al inicio 
   const { id } = useParams();

  useEffect(() => {   
     const token = localStorage.getItem('jwt');
     const decoded = jwtDecode(token);
     const role = decoded['role']
      if (role === 'teacher' || role ==='director') {
      setIsDirector(true);
    }
    
    
       if (!id) {
        setErrorMsg('No se proporcionó el ID del curso.');
        return;
      }                
    fetch(`${DynamicUrl}/AnnouncementCourse/${id}`)
      .then(res => res.json())
        //ordena de mas nuevo a mas viejo
      .then(data => { 
        const sorted = data.data.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
  setAnnouncements(sorted);
})

      .catch(err => console.error('Error inicial:', err));
  }, []);

  const handleDelete = async (id) => {
  if (!confirm("¿Estás seguro de que querés eliminar este Mensaje?")) return;
  try {
    const token = localStorage.getItem('jwt');
    fetch(`${DynamicUrl}/AnnouncementCourse/${id}`, {
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
  <h1 className="text-2xl font-bold">Mensajes del curso:</h1>
  {isDirector && (
    <Link
      to={`/Nuevo_Mensaje/${id}`}
      className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Agregar Comunicado
    </Link>
  )}
</div>
<hr/>
    <section className="space-y-4 my-6"> {errorMsg ? (
      <p className="text-red-600 text-center ">{errorMsg}</p>
        ) : announcements.length > 0 ? (
          announcements.map((notification) => (
        <div key={notification._id} className="max-w-6xl mx-auto border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-700">{notification.userName}</h3>
            <p className="text-2xs text-gray-400">
              Publicado el {new Date(notification.create_at).toLocaleString()}
              </p>
  </div>

  <div
    className="HTMLForzado prose max-w-none text-gray-800"
    dangerouslySetInnerHTML={{ __html: notification.message }}
  ></div>

  {isDirector && (
    <div className="border-t pt-4 flex justify-end gap-2">
      <Link
        to={`/Editar_Mensaje/${notification._id}`}
        className="inline-flex items-center bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Editar
      </Link>
      <button
        onClick={() => handleDelete(notification._id)}
        className="inline-flex items-center bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Eliminar
      </button>
    </div>
  )}
</div>

            
            
          ))
        ) : (
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
         <h3 className="text-lg font-semibold text-gray-700 mb-1">Sin comunicados</h3>
         <p className="text-sm text-gray-500 text-center max-w-sm">
          Aún no se ha publicado ningún anuncio para este curso. Cuando haya novedades, aparecerán aquí.
          </p>
      </div>
       )}
      </section>
        

      
    </div>
  );
};

export default AnnouncementList;