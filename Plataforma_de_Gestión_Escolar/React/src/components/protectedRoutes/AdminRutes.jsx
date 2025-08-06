import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const AdminRoutes = ({ children }) => {
    const { userData } = useContext(AuthContext)
    if( userData?.role != "Admin" ){
        return <Navigate to="/" replace/>
    }
    return children
}

export default AdminRoutes