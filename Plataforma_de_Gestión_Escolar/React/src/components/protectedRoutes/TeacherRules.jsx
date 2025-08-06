import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"

const TeacherRules  = ({ children }) => {
    const { userData } = useContext(AuthContext)
    if( !(userData?.role == "director" || userData?.role == "Admin"|| userData?.role == "teacher") ){
        return <Navigate to="/" replace/>
    }
    return children
}

export default TeacherRules 