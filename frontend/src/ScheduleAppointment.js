import React, { useState } from 'react';
import axios from 'axios';

const ScheduleAppointment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/appointments', {
        name, email, phone, appointmentDate, service
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setName('');
        setEmail('');
        setPhone('');
        setAppointmentDate('');
        setService('');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Usar a mensagem de erro do backend
      } else {
        setError('Erro ao agendar a consulta. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div>
      <h2>Agendar Consulta</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome" 
          required 
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Telefone" 
          required 
        />
        <input 
          type="datetime-local" 
          value={appointmentDate} 
          onChange={(e) => setAppointmentDate(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          value={service} 
          onChange={(e) => setService(e.target.value)} 
          placeholder="Serviço" 
          required 
        />
        <button type="submit">Agendar</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ScheduleAppointment;
