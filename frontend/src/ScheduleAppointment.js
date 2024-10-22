import React, { useState } from 'react';
import axios from 'axios';

const ScheduleAppointment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');  // Estado para mensagem de sucesso ou erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/appointments', {
        name, email, phone, appointmentDate, service
      });

      if (response.data.message) {
        setMessage('Consulta agendada com sucesso!');  // Mensagem de sucesso
      }
    } catch (error) {
      setMessage('Erro ao agendar a consulta. Por favor, tente novamente.');  // Mensagem de erro
    }
  };

  return (
    <div>
      <h2>Agendar Consulta</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário */}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone" required />
        <input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
        <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Serviço" required />

        <button type="submit">Agendar</button>
      </form>

      {message && <p>{message}</p>}  {/* Exibir mensagem de sucesso ou erro */}
    </div>
  );
};

export default ScheduleAppointment;
