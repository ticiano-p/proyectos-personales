import { useEffect, useState } from "react";
import DatosSchool from "../schools/DatosSchool";

const HomeUser = ({ id }) => {
    
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    const [loading, setLoading] = useState(true)
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
    return(
        <>
            {
                ( !loading )
                ? <DatosSchool id = { user.school_id } role = { user.role }/>
                : <p className="w-full text-center text-xl text-gray-600">  Buscando tu escuela...... </p>
            }
        </>
    )
}

export default HomeUser