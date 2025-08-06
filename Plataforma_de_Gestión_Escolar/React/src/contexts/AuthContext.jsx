import { createContext, useState, useEffect  } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({children}) {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      // const storedUser = localStorage.getItem('user'); 
      // No es buena practica guardar los datos del usuario en local
      // mejor guardar en contexto

      const storedToken = localStorage.getItem('jwt');
      
      // eslint-disable-next-line no-extra-boolean-cast
      if(!!storedToken){ // Se llama Falsy y truthy -- No es una simple doble negación 
        const dataToken = getDataJWT(storedToken)
        setUserData(dataToken)
      }

    } catch (error) {
      console.error("Error al recuperar datos de autenticación:", error);
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
    }
  }, []); 

  const getDataJWT = (resultJwt) => {
    const dataJWT = jwtDecode(resultJwt);
    return dataJWT
  }

  const login = (resultJwt) => {
    const dataJWT = jwtDecode(resultJwt);
    // localStorage.setItem('user', JSON.stringify(userData));
    setUserData(dataJWT);
    setToken(resultJwt)
    localStorage.setItem('jwt', resultJwt)
      
  }

  const logout = ()=>{
    setUserData(null);
    setToken(null)
    localStorage.removeItem('jwt')
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
  }

  return(
    <AuthContext.Provider value={{userData, token, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
    
 
}
export {AuthContext, AuthProvider}
