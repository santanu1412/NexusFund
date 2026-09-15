import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../ui/LoadingSpinner';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading) {
    return _jsxDEV(
      LoadingSpinner,
      {
        text: 'Checking authentication...',
      },
      void 0,
      false
    );
  }
  if (!isAuthenticated) {
    return _jsxDEV(
      Navigate,
      {
        to: '/login',
        replace: true,
      },
      void 0,
      false
    );
  }
  return children;
}
