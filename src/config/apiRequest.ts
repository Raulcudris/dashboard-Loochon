import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  timeout: 15000, // Aumenta el tiempo de espera a 15 segundos (15000 ms)
});

export default api;
