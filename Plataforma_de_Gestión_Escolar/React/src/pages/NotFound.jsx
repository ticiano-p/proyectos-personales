import { Link } from "react-router-dom"
function  NotFound() {

    return (
        <>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
  <h1 className="text-4xl mb-4">Error 404...</h1>
  <hr className="w-1/2 border-gray-600 mb-4" />
  <Link
    to="/" className="text-blue-400 hover:text-blue-200 underline text-lg transition duration-300">
    Regresar a inicio
  </Link>
</div>

        </>
    )
}

export default NotFound