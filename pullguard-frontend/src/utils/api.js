// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3008', // server root
  withCredentials: true,            // important for session cookies
});

// optional global error logger
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
