import PaymentRequests from "../payments/PaymentRequests"
import LastSchools from "../schools/LastSchools"
import LastUsers from "../users/LastUsers"

const HomeAdmin = () => {
    return (
        <>
            <LastUsers />
            <LastSchools />
            <PaymentRequests />
        </>
    )
}

export default HomeAdmin