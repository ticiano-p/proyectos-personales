import { useEffect, useState } from "react"
import Male from "../icons/Male"
import Famele from "../icons/Famele"
import User from "../icons/User"
import { Link } from "react-router-dom"

import UltimoPago from "../../components/payments/verPago"


const DatosUser = ({ id }) => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    const [loading, setLoading] = useState(true)
    const [imgError, setImgError  ] = useState('true')  
    const [user, setUser] = useState()


    useEffect( () => {
        fetch( `${DynamicUrl}/users/${id}` )
            .then(res => res.json())
            .then(data => {
                setUser(data)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            })
    },[])

    const genreIcon = (genre) => {
        let elegido 
        switch (genre) {
            case "Male":
                elegido = <Male width={ 24 } height={ 24 }/>
                break
            case "Famele":
                elegido = <Famele width={ 24 } height={ 24 }/>
                break
            default:
                elegido = ""
                break
        }
        return elegido
    } 

    return (
        <div>
            <h2 className="text-3xl text-gray-700 font-bold"> Perfil { user?.role } </h2>
            {user?.role === 'director' && (
                <div>
                    <UltimoPago />
                </div>
            )}             
            <small className="text-gray-500"> En está página puedes ver todos tus datos </small>
            <div className="mt-6 flex gap-4 w-full p-4 border border-gray-400 rounded-3xl">
                {
                    ( loading )
                    ? <p className="w-full text-center text-xl text-gray-600"> cargando los datos del usuario</p>
                    :
                    <>
                        <div className="flex justify-center items-center w-full md:w-3/12">
  {
    (user?.file && imgError)
      ? (
        <picture className="w-4/5 aspect-square flex justify-center items-center border-4 border-gray-200 rounded-full overflow-hidden">
          <img
            src={`${DynamicUrl}/uploads/${user.file}`}
            alt={`Foto de perfil de ${user.firstName} ${user.lastName}`}
            onError={() => setImgError(false)}
            
          />
        </picture>
      )
      : (
        <div className="w-4/5 aspect-square flex justify-center items-center border-4 border-gray-200 rounded-full bg-gray-100">
          <User className="w-1/2 h-1/2 text-gray-400" />
        </div>
      )
  }
</div>

                        <div className="relative w-full max-w-7/10 p-4 border border-gray-200 rounded-2xl">
                            <h3 className="font-semibold text-gray-800"> Datos personales </h3>
                            <div className="grid grid-cols-2 gap-y-4 p-2">
                                <div className="w-8/10 border-b border-gray-200">
                                    <small className="text-gray-500"> Nombre Completo: </small>
                                    <p className="pl-2 text-gray-800"> { user?.firstName } { user?.lastName } </p>
                                </div>
                                <div className="w-8/10 border-b border-gray-200">
                                    <small className="text-gray-500"> Genero: </small>
                                    <p className="pl-2 flex justify-between text-gray-800"> { user?.gender } { genreIcon(user?.gender) }</p>
                                </div>
                                <div className="w-8/10 border-b border-gray-200">
                                    <small className="text-gray-500"> Fecha de Nacimiento: </small>
                                    <p className="pl-2 text-gray-800"> { user?.birthDate.split('T')[0] } </p>
                                </div>
                                <div className="w-8/10 border-b border-gray-200">
                                    <small className="text-gray-500"> DNI: </small>
                                    <p className="pl-2 text-gray-800"> { user?.dni} </p>
                                </div>
                                <div className="w-8/10 border-b border-gray-200">
                                    <small className="text-gray-500"> Email: </small>
                                    <p className="pl-2 text-gray-800"> { user?.email} </p>
                                </div>
                                <div className="w-8/10 border-b border-gray-200">
                                    <small className="text-gray-500"> Telefono: </small>
                                    <p className="pl-2 text-gray-800"> { user?.phone} </p>
                                </div>
                                <div className="w-9/10 border-b border-gray-200 col-span-2">
                                    <small className="text-gray-500"> Dirección: </small>
                                    <p className="pl-2 text-gray-800"> { user?.address} </p>
                                </div>
                            </div>
                            <Link
                                to={`/Editar_Usuario/${user?._id}`}
                                title="Editar usuario"
                                className="absolute bottom-0 right-0 px-6 text-blue-400 text-lg border rounded-tl-xl rounded-br-xl hover:text-blue-600 transition"
                            >
                                Editar
                            </Link>
                        </div>
                    </>
                }
            </div>
            
        </div>
    )
}

export default DatosUser