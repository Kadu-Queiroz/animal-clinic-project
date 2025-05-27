import axios from 'axios';
import { API_URL } from '@/config/env';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const rawTutor = localStorage.getItem('tutor');
  if (rawTutor) {
    try {
      const tutor = JSON.parse(rawTutor);
      if (tutor.token) {
        config.headers.Authorization = `Bearer ${tutor.token}`;
      }
    } catch (err) {
      console.warn('🔐 Erro ao parsear tutor no localStorage', err);
    }
  }
  return config;
});

export default api;
