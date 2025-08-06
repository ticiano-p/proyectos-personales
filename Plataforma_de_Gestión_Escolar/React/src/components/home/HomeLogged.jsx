import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import DatosUser from "../users/DatosUser"
import HomeAdmin from "./HomeAdmin"
import HomeUser from "./HomeUser"

function HomeLogged(){

    const { userData } = useContext(AuthContext)
    const { id } = userData
    
    return(
        <>
            <main className="flex flex-col gap-12 overflow-y-auto pt-4">
                <DatosUser id = { id }/>
                {
                    ( userData.role == 'Admin' )
                        ? <HomeAdmin />
                        : <HomeUser id = { id }/>
                }
            </main>
        </>
    )
}

export default HomeLogged