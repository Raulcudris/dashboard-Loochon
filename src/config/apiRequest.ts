import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  timeout: 30000, // Aumenta el timeout a 30 segundos (o más si es necesario)
});

export default api;
