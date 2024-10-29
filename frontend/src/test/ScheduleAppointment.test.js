import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ScheduleAppointment from './ScheduleAppointment';

const axios = require('axios');

// Mock do axios para simular as requisições HTTP
jest.mock('axios');

describe('ScheduleAppointment Component', () => {
  beforeEach(() => {
    // Limpa todas as chamadas anteriores ao mock
    jest.clearAllMocks();
  });

  test('renderiza o formulário corretamente', () => {
    render(<ScheduleAppointment />);
    expect(screen.getByPlaceholderText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Serviço/i)).toBeInTheDocument();
    expect(screen.getByText(/Agendar/i)).toBeInTheDocument();
  });

  test('exibe mensagem de sucesso ao agendar a consulta', async () => {
    // Mock da resposta de sucesso do axios
    axios.post.mockResolvedValueOnce({
      data: { message: 'Consulta agendada com sucesso!' }
    });

    render(<ScheduleAppointment />);

    // Preenche os campos do formulário
    fireEvent.change(screen.getByPlaceholderText(/Nome/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'joao@email.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Telefone/i), { target: { value: '11999999999' } });
    fireEvent.change(screen.getByPlaceholderText(/Serviço/i), { target: { value: 'Consulta de rotina' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '2024-10-20T10:00' } });

    // Submete o formulário
    fireEvent.click(screen.getByText(/Agendar/i));

    // Espera que a mensagem de sucesso seja exibida
    await waitFor(() => {
      expect(screen.getByText(/Consulta agendada com sucesso!/i)).toBeInTheDocument();
    });

    // Verifica se os campos foram limpos após o envio
    expect(screen.getByPlaceholderText(/Nome/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Email/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Telefone/i).value).toBe('');
    expect(screen.getByPlaceholderText(/Serviço/i).value).toBe('');
  });

  test('exibe mensagem de erro ao tentar agendar em horário já ocupado', async () => {
    // Mock da resposta de erro por conflito de horário (status 409)
    axios.post.mockRejectedValueOnce({
      response: { status: 409 }
    });

    render(<ScheduleAppointment />);

    // Preenche os campos do formulário
    fireEvent.change(screen.getByPlaceholderText(/Nome/i), { target: { value: 'Maria Souza' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'maria@email.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Telefone/i), { target: { value: '11988888888' } });
    fireEvent.change(screen.getByPlaceholderText(/Serviço/i), { target: { value: 'Consulta de emergência' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '2024-10-20T11:00' } });

    // Submete o formulário
    fireEvent.click(screen.getByText(/Agendar/i));

    // Espera que a mensagem de erro seja exibida
    await waitFor(() => {
      expect(screen.getByText(/Horário já ocupado. Escolha outro horário./i)).toBeInTheDocument();
    });
  });

  test('exibe mensagem de erro genérico ao falhar o agendamento', async () => {
    // Mock da resposta de erro genérico
    axios.post.mockRejectedValueOnce({
      response: { status: 500 }
    });

    render(<ScheduleAppointment />);

    // Preenche os campos do formulário
    fireEvent.change(screen.getByPlaceholderText(/Nome/i), { target: { value: 'Ana Costa' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'ana@email.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Telefone/i), { target: { value: '11977777777' } });
    fireEvent.change(screen.getByPlaceholderText(/Serviço/i), { target: { value: 'Vacinação' } });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '2024-10-21T12:00' } });

    // Submete o formulário
    fireEvent.click(screen.getByText(/Agendar/i));

    // Espera que a mensagem de erro genérico seja exibida
    await waitFor(() => {
      expect(screen.getByText(/Erro ao agendar a consulta. Por favor, tente novamente./i)).toBeInTheDocument();
    });
  });
});
