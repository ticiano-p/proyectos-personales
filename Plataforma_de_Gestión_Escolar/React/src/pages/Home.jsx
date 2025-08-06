import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import HomeUnlogged from "../components/home/HomeUnlogged"
import HomeLogged from "../components/home/HomeLogged"

function  Home() {
  const { userData } = useContext(AuthContext)
  return (
    <div className="w-full max-w-8/10 mx-auto mb-12">
      {
        ( userData )
          ? <HomeLogged />
          : <HomeUnlogged />
      }
    </div>
  )
}
export default Home 