import React, { useState } from 'react';
import axios from 'axios';

const ScheduleAppointment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [service, setService] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]); // Estado para horários disponíveis
  const [selectedTime, setSelectedTime] = useState(''); // Estado para o horário selecionado
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Função para buscar horários disponíveis no backend
  const fetchAvailableTimes = async (date) => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments/available-times?date=${date}`);
      setAvailableTimes(response.data.availableTimes);
      setError('');
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      setError('Não foi possível carregar os horários disponíveis.');
    }
  };

  // Manipulador para mudança na data
  const handleDateChange = (e) => {
    const date = e.target.value;
    setAppointmentDate(date);

    // Converte a data para DD-MM-YYYY antes de buscar horários
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    fetchAvailableTimes(formattedDate); // Buscar horários disponíveis para a data selecionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    try {
      const appointmentDateTime = `${appointmentDate} ${selectedTime}:00`; // Ajuste de formato
  
      const response = await axios.post('http://localhost:5000/appointments', {
        name,
        email,
        phone,
        appointmentDate: appointmentDateTime,
        service,
      });
  
      if (response.data.message) {
        setMessage(response.data.message);
        setName('');
        setEmail('');
        setPhone('');
        setAppointmentDate('');
        setService('');
        setSelectedTime('');
        setAvailableTimes([]);
      }
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
    
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(`Erro ao agendar a consulta. Detalhes: ${error.message || 'Erro desconhecido'}`);
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
          type="date" 
          value={appointmentDate} 
          onChange={handleDateChange} 
          required 
        />
        {availableTimes.length > 0 && (
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
            <option value="">Selecione um horário</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        )}
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
