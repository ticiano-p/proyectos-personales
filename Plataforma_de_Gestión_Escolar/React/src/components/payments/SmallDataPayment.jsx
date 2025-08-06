import { useState } from "react"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const SmallDataPayment = ({ payment, key }) => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    const [userName, setUserName] = useState()
    const [loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${DynamicUrl}/users/${payment.issuedTo}`);
                const data = await res.json();
                if (data.firstName.length > 2) {
                    setUserName(data.firstName);
                }
            } catch {
                setUserName(true);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    
    const handleSubmitAprobar = (e) => {
        e.preventDefault()
        console.log(`${DynamicUrl}/payment/${payment._id}`)
        fetch(`${DynamicUrl}/payment/${payment._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status": "paid"
            }), 
        })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            alert("Pago Aprobado")
            window.location.reload()
        })
    }
    const handleSubmitDesaprobar = (e) => {
        e.preventDefault()
        fetch(`${DynamicUrl}/payment/${payment._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status": "overdue"
            }), 
        })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            alert("Pago no aprobado")
            window.location.reload()
        })
    }
    return (
        <>
        {
            ( !loading && userName )
                ?   <div
                        key={ key }
                        className="user-card flex flex-col justify-between min-h-50 w-[300px] border border-gray-300 rounded-xl p-4 text-center bg-gray-100"
                    >
                        <h2 className="text-3xl text-gray-700 font-bold"> { userName } </h2>
                        <p className="p-2 w-full text-start text-gray-800">
                            <span className="text-gray-900 font-semibold"> Intención: </span> 
                            {payment.concept}
                        </p>
                        <p className="p-2 w-full text-start text-gray-800">
                            <span className="text-gray-900 font-semibold"> Monto : </span> 
                            {payment.amount} $
                        </p>
                        <div className="w-full flex gap-2">
                            <form onSubmit={handleSubmitAprobar} method="post" className="w-full">
                                <button type="submit" className="w-full text-green-500 border hover:text-green-800 transition cursor-pointer rounded"> Aprobar </button>
                            </form>
                            <form onSubmit={handleSubmitDesaprobar} method="post" className="w-full">
                                <button type="submit" className="w-full text-red-500 border hover:text-red-800 transition cursor-pointer rounded"> Denegar </button>
                            </form>
                        </div>
                    </div>  
                :   "" 
        } 
        </>
    )
}

export default SmallDataPayment