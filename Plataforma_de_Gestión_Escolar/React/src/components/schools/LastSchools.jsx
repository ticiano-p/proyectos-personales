import { useEffect, useState } from "react"
import SmallDataschool from "./SmallDataSchool"

const LastSchools = () => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    
    const [schools, setSchools] = useState()
    const [loading, setLoading] = useState(true)
    
    
    useEffect( () => {
        fetch( `${DynamicUrl}/School/lastSchool` )
            .then(res => res.json())
            .then(data => {
                setSchools(data)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            })
    },[])
    
    return (
        <div className="group">
            <h2 className="mb-4 border-b border-gray-100 text-3xl text-gray-700 font-bold  group-hover:border-gray-400 trnasition duration-300"> Ultimas Escuelas registrados </h2>
            <div className="flex min-h-content gap-12 justify-center items-center">
                {
                    ( loading ) 
                        ? <p className="w-full text-center text-xl text-gray-600"> cargando los datos del usuario</p>
                        : schools.map( school => <SmallDataschool school={school} key={school._id}/>
                    )
                }
            </div>
        </div>
    )
}

export default LastSchools