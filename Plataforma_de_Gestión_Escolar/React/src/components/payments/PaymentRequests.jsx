import { useEffect, useState } from "react"
import SmallDataPayment from "./SmallDataPayment"

const PaymentRequests = () => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl

    const [loading, setLoading] = useState(true)
    const [payments, setPayments] = useState()
    let paymentsUnaprobate

    useEffect( () => {
        fetch(`${DynamicUrl}/payment/unapproved`)
            .then(res => res.json())
            .then(data => {
                paymentsUnaprobate = data.data.filter( (pay) => pay.status == "pending" )
                setPayments(paymentsUnaprobate)
                setLoading(false)
            })
    },[])

    return (  
        <div className="group min-h-40">
            <h2 className="mb-4 border-b border-gray-100 text-3xl text-gray-700 font-bold group-hover:border-gray-400 duration-300"> 
                Pagos pendientes a aprobar 
            </h2>
            <div className="w-full min-h-content flex gap-12 justify-center items-center">
                {
                    ( loading && payments ) 
                        ? <p className="flex-1 w-full text-center text-xl text-gray-600"> cargando los pagos de usuarios</p>
                        : ( payments?.length >= 1 ) 
                            ? payments.map( payment => <SmallDataPayment payment={payment} key={payment._id} />)
                            : <p className="w-full text-center text-xl text-gray-600"> No hay pagos por aprobar </p>
                }
            </div>
        </div>
    )
} 

export default PaymentRequests