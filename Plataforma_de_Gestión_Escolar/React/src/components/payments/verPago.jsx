import  { useContext, useEffect, useState } from 'react';
const DynamicUrl = import.meta.env.VITE_DynamicUrl
import { Link } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext';

// Componente para mostrar fecha de vencimiento con aviso 
function DueDate({ dueDate }) {
  if (!dueDate) {
  return (
    <p className="text-yellow-600 font-semibold">
      ⏳ Licencia pendiente de activación
    </p>
  );
}

  
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = due.toLocaleDateString();

  const isNear = diffDays <= 30 && diffDays >= 0;
  const isExpired = due < now;
  const daysSinceExpired = Math.ceil((now - due) / (1000 * 60 * 60 * 24));
  const gracePeriodLeft = 7 - daysSinceExpired;

  return (
    <div className="space-y-2 flex justify-between items-center mb-4 ">
      <div>
        {!isExpired && (
    <p className={isNear ? 'text-red-600 font-bold' : 'text-gray-800'}>
      Fecha de vencimiento de la licencia: <strong>{formattedDate}</strong> 
    </p>
    
  )}

  {isExpired && (
    <div
      title="Durante este período podés seguir usando el sistema. Luego el sistema se bloqueara"
      className="text-red-600 font-semibold flex items-center gap-2"
    >
      <p>⚠️ Licencia vencida:</p>
      {gracePeriodLeft > 0 ? (
        <p>{gracePeriodLeft} día(s) restante(s)</p>
      ) : (
        <p>El período de gracia ha finalizado.</p>
      )}
    </div>
  )}
      </div>
 {(isNear || isExpired) && (
    <Link
      to="/Realizar_Pago"
      className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
    >
      Realizar Pago
    </Link>
  )}
</div>
  );
}

export default function LastPayment() {
  const [dueDate, setDueDate] = useState(null);
  const { userData } = useContext(AuthContext)

  useEffect(() => {

    // const token = localStorage.getItem('jwt');
    // let decoded = jwtDecode(token);

    // const schoolId = decoded['School'];
   
    if (!userData || !userData.id) return;
    fetch( `${DynamicUrl}/payment/${userData.id}/User` )
      .then(res => res.json())
      .then(response  => {
        const payments = response.data; 
        if(payments.length > 0){
          const lastPayment = payments.sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))[0];
          setDueDate(lastPayment.dueDate);
        }
      })
    //  Hacer fetch al backend 
    // fetch(`${DynamicUrl}/payment/issuedToPaid/${schoolId}`)
    //   .then(res => {
    //     return res.json();
        
    //   })
    //   .then(response  => {
    //     const payments = response.data; 
    //     const lastPayment = payments.sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))[0];
    //     setDueDate(lastPayment.dueDate);
    //   })
      .catch(err => {
        (err.message);
      })
  }, []);

  return (
    <div>
      {
        ( dueDate )
        ? <>
            <h3 className="text-lg font-bold mb-2">Último pago de la escuela:</h3>
            <DueDate dueDate={dueDate}/>
          </>
          : ""
      }
    </div>
  );
}
