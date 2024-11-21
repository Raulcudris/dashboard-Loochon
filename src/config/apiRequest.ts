import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  timeout: 5000,
});

export default api;
