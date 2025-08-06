import { Navigate } from "react-router-dom"

const UnLoggedRoutes = ({ children }) => {
    const user = localStorage.getItem('jwt')
    if( !user == false ){
        return <Navigate to="/" replace/>
    }
    return children
}

export default UnLoggedRoutes   