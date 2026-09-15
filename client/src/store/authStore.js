import { create } from 'zustand';
import api from '../lib/api';
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  checkAuth: async () => {
    try {
      const res = await api.get('/users/me');
      set({
        user: res.data.data,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
  register: async (name, email, password, role = 'donor') => {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      role,
    });
    set({
      user: res.data.user,
      isAuthenticated: true,
    });
    return res.data.user;
  },
  login: async (email, password) => {
    const res = await api.post('/auth/login', {
      email,
      password,
    });
    set({
      user: res.data.user,
      isAuthenticated: true,
    });
    return res.data.user;
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  updateUser: (userData) => {
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            ...userData,
          }
        : null,
    }));
  },
}));
