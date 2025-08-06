import  { useState ,  useEffect  } from 'react';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;
import { useParams, useNavigate  } from 'react-router-dom';

const SchoolEditForm = ()=>{
  const {id}= useParams();
  const navigate = useNavigate();

  const [useLoading, setUseLoading] = useState(false)
  const [errors, setErrors] = useState({});

 const [schools, setschools] = useState({

       user_id:'',
       name:'',
       CUE:'' ,
       address:'',
       city: '',
       province: '',
       phones:'',
       Emails: '',
       creation_date: new Date(),
       level:'',
       type: ''
    })
     // Cargar los datos actuales
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`${DynamicUrl}/school/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener la escuela');
        const data = await response.json();
        setschools(data); // llena el formulario con los datos actuales
      } catch (error) {
        console.error('Error al cargar los datos de la escuela:', error);
      }
    };
    fetchSchoolData();
  }, [id]);
  const validateForm = () => {
  const newErrors = {};

  if (!schools.user_id) newErrors.user_id = 'El ID del usuario es obligatorio.';
  if (!schools.name.trim()) newErrors.name = 'El nombre de la escuela es obligatorio.';
  if (!schools.CUE.trim()) newErrors.CUE = 'El CUE es obligatorio.';
  if (!schools.address.trim()) newErrors.address = 'La dirección es obligatoria.';
  if (!schools.city.trim()) newErrors.city = 'La ciudad es obligatoria.';
  if (!schools.province.trim()) newErrors.province = 'La provincia es obligatoria.';
  if (!String(schools.phones).trim()) {
  newErrors.phones = 'El teléfono es obligatorio.';
}

if (schools.Emails && !String(schools.Emails).split(',').every(email => /\S+@\S+\.\S+/.test(email.trim()))) {
  newErrors.Emails = 'El correos electrónicos no es válido.';
}

  if (!schools.level) newErrors.level = 'Seleccioná un nivel educativo.';
  if (!schools.type) newErrors.type = 'Seleccioná un tipo de gestión.';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setUseLoading(true)

  try {
    const response = await fetch(`${DynamicUrl}/school/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schools),
    });
    try {
      navigate('/Lista_Escuela');
    } catch (error) {
            console.error('Error al enviar los datos:', error);

    }
    setUseLoading(false)
    if (!response.ok) {
      const errorText = await response.text(); 
      alert(errorText)
    }
  } catch (error) {
    console.error('Error al crear escuela:', error);
    setUseLoading(false)
  }
};

    const handleChange = (e)=> {
     const { name, value, type, checked } = e.target;
      setschools((prevData)=>({
        ...prevData, [name]: type === 'checkbox' ? checked : value,
      }))
    }
 return(
    <div className="school-container bg-gray-100 py-4">
  <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 className="text-2xl font-bold text-center">Editar datos de: <strong>{schools.name}</strong> </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID del propietario</label>
          <input
        name="user_id"
        type="text"
        placeholder="ID de Usuario"
        value={schools.user_id}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
      {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}

      </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
        name="name"
        type="text"
        placeholder="Nombre de la escuela"
        value={schools.name}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Identifiacador educativo</label>

          <input
        name="CUE"
        type="text"
        placeholder="CUE"
        value={schools.CUE}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
      {errors.CUE && <p className="text-red-500 text-sm mt-1">{errors.CUE}</p>}

      </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
        name="phones"
        type="tel"
        placeholder="Teléfonos (separados por coma)"
        value={schools.phones}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
      {errors.phones && <p className="text-red-500 text-sm mt-1">{errors.phones}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input
        name="address"
        type="text"
        placeholder="Dirección"
        value={schools.address}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
        <input
        name="city"
        type="text"
        placeholder="Ciudad"
        value={schools.city}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
        <input
        name="province"
        type="text"
        placeholder="Provincia"
        value={schools.province}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      />
      {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
        name="Emails"
        type="text"
        placeholder="Emails (separados por coma)"
        value={schools.Emails}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
      />
      {errors.Emails && <p className="text-red-500 text-sm mt-1">{errors.Emails}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel academico</label>
        <select
        name="level"
        value={schools.level}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      >
        <option value="">Nivel</option>
        <option value="Inicial">Inicial</option>
        <option value="Primario">Primario</option>
        <option value="Secundario">Secundario</option>
        <option value="Terciario">Terciario</option>
      </select>
      {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de gestion</label>
        <select
        name="type"
        value={schools.type}
        onChange={handleChange}
        className="`w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2"
        
      >
        <option value="">Tipo de institución</option>
        <option value="Pública">Pública</option>
        <option value="Privada">Privada</option>
        <option value="Subencionada">Subencionada</option>

      </select>
      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}

      </div>
  
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      { (useLoading) ? 'loading' : 'Guardar Escuela' }
    </button>
  </form>
</div>

 )
}

export default SchoolEditForm;