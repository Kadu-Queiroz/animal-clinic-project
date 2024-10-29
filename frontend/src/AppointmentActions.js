import React, { useState } from 'react';
import axios from 'axios';

const AppointmentActions = ({ appointment }) => {
  const [appointmentDate, setAppointmentDate] = useState(appointment.appointment_date);
  const [service, setService] = useState(appointment.service);
  const [message, setMessage] = useState('');

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/appointments/${appointment.id}`, {
        appointmentDate, service
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro ao editar a consulta.');
    }
  };

  const handleCancel = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/appointments/${appointment.id}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro ao cancelar a consulta.');
    }
  };

  return (
    <div>
      <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
      <input type="text" value={service} onChange={(e) => setService(e.target.value)} />

      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleCancel}>Cancelar</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AppointmentActions;
