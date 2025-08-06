import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode";


const DatosSchool = ({ id, role }) => {
    
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    const [loading, setLoading] = useState(true)
    const [ school, setSchool ] = useState()
    const [schoolId, setSchoolId] = useState(null);

    useEffect( () => {
        const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setSchoolId(decoded?.School || null);
    }
    if (id) {
        fetch(`${DynamicUrl}/school/${id}` )
            .then( res => res.json() )
            .then( data => {
                setSchool(data)
                 setLoading(false)
            })
    }
     else{
        setLoading(false);
     }   
    } , [] )
    return (
        <>
            {loading ? (
      <p className="text-center text-gray-500 py-4">Cargando los datos de escuela...</p>
    ) : !schoolId || schoolId === "null" ? (
      role === "director" ? (
        <div className="bg-yellow-100 border-l-4 flex justify-center border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm">
          <div className="text-base font-medium inline-flex items-center gap-2">
            <p className="m-0">No tienes ninguna institución asociada.</p>
            <Link to="/Crear_Escuela" className="text-blue-600 hover:text-blue-800 underline">
              Crear una
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No estás asociado a ninguna institución.</p>
      )
    ) : ( <>
                    <div className="relative w-full p-4 border border-gray-400 rounded-2xl">
                        <h3 className="font-semibold text-xl text-gray-800"> Escuela a la que estás asociado </h3>
                        <div className="grid grid-cols-2 gap-y-4 p-2">
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500"> Nombre Completo: </small>
                                <p className="pl-2 text-gray-800"> { school.name } </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Email: </small>
                                <p className="pl-2 text-gray-800">
                                {   
                                    school.Emails.map( (email, index) => {
                                        return <small className="text-center" key={index}>{ (index > 0) ? "," : "" } { email } <br/></small>
                                    })
                                } 
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Telefono: </small>
                                <p className="pl-2 text-gray-800">
                                {   
                                    school.phones.map( (phone, index) => {
                                        return <small className="text-center" key={index}>{ (index > 0) ? "," : "" } { phone }</small>
                                    })
                                } 
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Intitución: </small> 
                                <p className="pl-2 text-gray-800">
                                {school.type}
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Provincia: </small> 
                                <p className="pl-2 text-gray-800">
                                {school.province}
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Ciudad </small> 
                                <p className="pl-2 text-gray-800">
                                {school.city}
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Dirección: </small> 
                                <p className="pl-2 text-gray-800">
                                {school.address}
                                </p>
                            </div>
                        </div>
                        {
                            ( role == "director" )
                                ? 
                                <Link
                                    to={`Editar_Escuela/${id}`  }
                                    title="Editar usuario"
                                    className="absolute bottom-0 right-0 px-6 text-blue-400 text-lg border rounded-tl-xl rounded-br-xl hover:text-blue-600 transition"
                                >
                                    Editar
                                </Link>
                                : ""
                        }
                    </div>
                </>)
               
        }
        </>
    )
}

export default DatosSchool