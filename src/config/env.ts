const fallback = 'http://localhost:8000';

export const API_URL = import.meta.env.VITE_API_URL || fallback;

if (!import.meta.env.VITE_API_URL) {
  console.warn(`⚠️ VITE_API_URL não definido. Usando fallback: ${fallback}`);
}
