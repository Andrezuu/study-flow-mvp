import axios from 'axios';

// Configuración base para JSON Server
const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;