import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments-details');
        setAppointments(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Lista de Consultas Agendadas</h2>
      <table>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data da Consulta</th>
            <th>Serviço</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phone}</td>
              <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
              <td>{appointment.service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
