import { Link } from "react-router-dom"

const SmallDataSchool = ({ school, key }) => {
    return(
        <>
        <div
            key = { key }
            className="school-card flex flex-col justify-between min-h-100 w-[300px] border border-gray-300 rounded-xl p-4 text-center bg-gray-100"
        >
            <h3 className="text-xl text-center font-bold text-gray-800 mb-2">{school.name}</h3>
            <hr className="border-gray-300 mb-3" />
            <div className="h-full flex-1">
                 <p className="p-2 w-full text-start text-gray-800">
                    <span className="text-gray-900 font-semibold">Email: </span>
                    {   
                        school.Emails.map( (email, index) => {
                            return <span className="text-center" key={index}>{ (index > 0) ? "," : "" } { email } <br/></span>
                        })
                    } 
                </p>
                <p className="p-2 w-full text-start text-gray-800">
                    <span className="text-gray-900 font-semibold">Telefono: </span>
                    {   
                        school.phones.map( (phone, index) => {
                            return <span className="text-center" key={index}>{ (index > 0) ? "," : "" } { phone }</span>
                        })
                    } 
                </p>
                <p className="p-2 w-full text-start text-gray-800">
                    <span className="text-gray-900 font-semibold">Intitución: </span> 
                    {school.type}
                </p>
                <p className="p-2 w-full text-start text-gray-800">
                    <span className="text-gray-900 font-semibold">Provincia: </span> 
                    {school.province}
                </p>
                <p className="p-2 w-full text-start text-gray-800">
                    <span className="text-gray-900 font-semibold">Ciudad </span> 
                    {school.city}
                </p>
                <p className="p-2 w-full text-start text-gray-800">
                    <span className="text-gray-900 font-semibold">Dirección: </span> 
                    {school.address}
                </p>
            </div>
            <Link
                to={`/Editar_Escuela/${school._id}`}
                className="inline-block w-full text-blue-400 underline text-lg transition duration-300 border rounded-xl hover:text-blue-600"
                >
                Editar
            </Link>
        </div>
        </>
    )
}

export default SmallDataSchool