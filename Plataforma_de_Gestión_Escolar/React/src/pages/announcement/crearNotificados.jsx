
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate  } from 'react-router-dom';
import '../../../public/editor.css'; 

//editor mejorado 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const CrearNotificados  = () => {
  
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    user_id: null,
    school_id: null,
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem('jwt');
      const decoded = jwtDecode(token);

      setPayload({
        user_id: decoded['id'],
        school_id: decoded['School'],
      });
    } catch (err) {
      setErrorMsg('Error al decodificar el token.', err);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('El mensaje no puede estar vacío.');
      return;
    }

    try {
      const res = await fetch(`${DynamicUrl}/announcement/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          message,
          user_id: payload.user_id,
          school_id: payload.school_id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al crear el comunicado');
      }

      setSuccessMsg('Comunicado creado exitosamente.');
      setMessage('');
      setTimeout(() => navigate('/Comunicados'), 2000);
      navigate('/Comunicados')
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className=" max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
  <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
    Crear Comunicado
  </h2>

  {errorMsg && (
    <p role="alert" className="text-red-700 bg-red-100 border border-red-400 p-3 rounded mb-4 text-sm" >
      {errorMsg}
    </p>
  )}

  {successMsg && (
    <p role="alert" className="text-green-700 bg-green-100 border border-green-400 p-3 rounded mb-4 text-sm" >
      {successMsg}
    </p>
  )}
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="message-editor" className="block text-gray-700 font-semibold mb-2" >
        Escribí tu comunicado
      </label>
      <div id="message-editor" className=" HTMLForzado border border-gray-300 ">
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
    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300" >
      Publicar Comunicado
    </button>
  </form>
</div>
  );
};

export default CrearNotificados ;