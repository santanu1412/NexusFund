import axios from 'axios';
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then(() => api(originalRequest));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await axios.post(
          '/api/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        );
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject({
      ...error,
      message,
    });
  }
);
export default api;
