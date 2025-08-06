import { Navigate } from "react-router-dom"

const LoggedRoutes = ({ children }) => {
    const user = localStorage.getItem('jwt')
    if( user == null ){
        return <Navigate to="/" replace/>
    }
    return children
}

export default LoggedRoutes