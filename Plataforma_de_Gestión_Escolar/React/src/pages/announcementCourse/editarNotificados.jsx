import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../../public/editor.css'; 

const DynamicUrl = import.meta.env.VITE_DynamicUrl;
const EditarNotificados = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const res = await fetch(`${DynamicUrl}/AnnouncementCourse/anuncio/${id}`, {
           headers: {
           'Authorization': `Bearer ${token}`
        }
});
        const data = await res.json();
        console.log(data);
        setMessage(data.data.message);
      } catch (error) {
        console.error('Error al cargar el comunicado:', error);
      }
    };

    fetchAnnouncement();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await fetch(`${DynamicUrl}/AnnouncementCourse/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });
        navigate(`/Curso`);
      
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        Editar Mensaje 
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="message-editor" className="block text-gray-700 font-semibold mb-2">
            Modificá el Mensaje del curso
          </label>
          <div id="message-editor" className=" HTMLForzado border border-gray-300">
            <CKEditor
              editor={ClassicEditor}
              data={message}
              onReady={(editor) => {
                editor.ui.view.editable.element.style.minHeight = '12rem';
              }}
              onChange={(event, editor) => setMessage(editor.getData())}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarNotificados;
