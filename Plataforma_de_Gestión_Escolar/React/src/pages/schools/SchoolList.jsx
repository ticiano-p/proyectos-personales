import { useEffect, useState } from 'react';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;
import { Link } from "react-router-dom"
 import ProvinceFilter from '../../components/schools/ProvinceFilter';
 import TypeFilter from '../../components/schools/TypeFilter';
 import NameFilter from '../../components/schools/NameFilter';
import SmallDataSchool from '../../components/schools/SmallDataSchool';
const SchoolList = ()=>{
    const [schools, setSchool]= useState([])
   // se ejecuta después de que el componente se ha montado
    useEffect(()=>{
         fetch(`${DynamicUrl}/school`)
         .then(response => response.json())
         .then(data => setSchool(data)) 
         .catch(error => console.error('Error al cargar usuarios:', error));
    }, [])

     return (
    <div className='w-full max-w-9/10 mx-auto py-8'>
      <h1 className="text-2xl font-bold mb-4">Lista de Escuelas</h1>

      <div>
        <ProvinceFilter apiUrl={DynamicUrl} onResult={setSchool} />
        <TypeFilter apiUrl={DynamicUrl} onResult={setSchool} />
        <NameFilter apiUrl={DynamicUrl} onResult={setSchool} />
      </div>

      <div className="bg-cyan-900/40 flex flex-wrap gap-5 justify-center p-4 rounded-2xl">
        {schools.length > 0 ? (
          schools.map((school) => (
            <SmallDataSchool school={school} key={school._id}/>
          ))
        ) : (
          <p className="text-red-600">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
};

export default SchoolList;