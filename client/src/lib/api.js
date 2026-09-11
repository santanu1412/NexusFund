import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important for cookies
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default api;