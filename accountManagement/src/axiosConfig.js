import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://accmanagement-backend.onrender.com', // Use environment variable or fallback URL
  withCredentials: true, // Allow sending cookies with requests
});

// Optional: Set up interceptors for handling errors or attaching tokens
API.interceptors.request.use(
  (config) => {
    // You can attach tokens or other headers here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., redirect to login if unauthorized)
    if (error.response && error.response.status === 401) {
      // Perform logout or redirect if necessary
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
