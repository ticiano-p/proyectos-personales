import { useEffect, useState } from "react"
import SmallDataUser from "./SmallDataUser"

const LastUsers = () => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)


    useEffect( () => {
        fetch( `${DynamicUrl}/users/lastUser` )
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            })
    },[])

    return(
        <div className="group">
            <h2 className="mb-4 border-b border-gray-100 text-3xl text-gray-700 font-bold group-hover:border-gray-400 duration-300"> Ultimos Usuarios registrados </h2>
            <div className="min-h-content flex gap-12 justify-center items-center">
                {
                    ( loading ) 
                        ? <p className="w-full text-center text-xl text-gray-600"> cargando los datos del usuario</p>
                        : users.map( user => <SmallDataUser user={user} key={user._id} />
                    )
                }
            </div>
        </div>
    )
}

export default LastUsers