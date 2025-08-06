import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const CreatePaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    concept: '',
    pack: '',
    amount: '',
    dueDate: '',
    paymentMethod: '',
    paymentType: 'create_school'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'pack') {
      let amount = 0;
      let months = 0;

      switch (value) {
        case 'PAC 3 meses':
          amount = 5000;
          months = 3;
          break;
        case 'PAC 6 meses':
          amount = 9000;
          months = 6;
          break;
        case 'PAC 12 meses':
          amount = 16000;
          months = 12;
          break;
      }

      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + months);

      setFormData((prev) => ({
        ...prev,
        pack: value,
        amount,
        dueDate: dueDate.toISOString().split('T')[0] // YYYY-MM-DD
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwt');
      const decoded = jwtDecode(token);

      const paymentData = {
        issuedTo: decoded['id'],
        schoolId: decoded['School'],
        concept: formData.concept,
        amount: formData.amount,
        dueDate: formData.dueDate,
        paymentMethod: formData.paymentMethod,
        paymentType: formData.paymentType
      };

      const response = await fetch(`${DynamicUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Error al crear el pago');

      setMessage(result.message);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-sm space-y-5">
  <div className="flex justify-between items-center">
    <h2 className="text-lg font-bold text-gray-800">Generar solicitud de pago</h2>
    
  </div>

  {/* Concepto visible */}
  <div>
    <label className="text-sm font-semibold text-gray-700 block mb-1">Concepto</label>
    <input
      type="text"
      name="concept"
      value={formData.concept}
      onChange={handleChange}
      required
      placeholder="Ej: Creación de escuela"
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
    />
  </div>

  {/* Pack */}
  <div>
    <label className="text-sm font-semibold text-gray-700 block mb-1">Tipo de PAC</label>
    <select
      name="pack"
      value={formData.pack}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
    >
      <option value="">Seleccionar PAC</option>
      <option value="PAC 3 meses">PAC 3 meses ($5000)</option>
      <option value="PAC 6 meses">PAC 6 meses ($9000)</option>
      <option value="PAC 12 meses">PAC 12 meses ($16000)</option>
    </select>
  </div>

  {/* Método de pago */}
  <div>
    <label className="text-sm font-semibold text-gray-700 block mb-1">Método de pago</label>
    <select
      name="paymentMethod"
      value={formData.paymentMethod}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
    >
      <option value="">Seleccionar</option>
      <option value="cash">Efectivo</option>
      <option value="transfer">Transferencia</option>
      <option value="card">Tarjeta</option>
    </select>
  </div>

  {/* Campos ocultos */}
  <input type="hidden" name="amount" value={formData.amount} />
  <input type="hidden" name="dueDate" value={formData.dueDate} />

  <div className="pt-3">
    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
    >
      Generar pago
    </button>
  </div>

  {message && (
    <div className="text-center mt-2 text-sm text-green-700 bg-green-100 px-4 py-2 rounded-md border border-green-200">
      {message}
    </div>
  )}
</form>
</div>

  );
};

export default CreatePaymentForm;
