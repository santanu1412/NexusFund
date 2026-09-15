import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CampaignDetail from './pages/CampaignDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateCampaign from './pages/CreateCampaign';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PaymentSuccess from './pages/PaymentSuccess';
import HowItWorks from './pages/HowItWorks';
import NotFound from './pages/NotFound';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from 'react/jsx-dev-runtime';
function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return _jsxDEV(
    _Fragment,
    {
      children: [
        _jsxDEV(
          Toaster,
          {
            position: 'top-center',
            toastOptions: {
              duration: 4000,
              style: {
                background: '#fff',
                color: '#111827',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            },
          },
          void 0,
          false
        ),
        _jsxDEV(Navbar, {}, void 0, false),
        _jsxDEV(
          'main',
          {
            children: _jsxDEV(
              Routes,
              {
                children: [
                  _jsxDEV(
                    Route,
                    {
                      path: '/',
                      element: _jsxDEV(Home, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/explore',
                      element: _jsxDEV(Explore, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/campaigns/:id',
                      element: _jsxDEV(CampaignDetail, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/login',
                      element: _jsxDEV(Login, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/register',
                      element: _jsxDEV(Register, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/how-it-works',
                      element: _jsxDEV(HowItWorks, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/payment-success',
                      element: _jsxDEV(PaymentSuccess, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/dashboard',
                      element: _jsxDEV(
                        ProtectedRoute,
                        {
                          children: _jsxDEV(Dashboard, {}, void 0, false),
                        },
                        void 0,
                        false
                      ),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/create',
                      element: _jsxDEV(
                        ProtectedRoute,
                        {
                          children: _jsxDEV(CreateCampaign, {}, void 0, false),
                        },
                        void 0,
                        false
                      ),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '/profile',
                      element: _jsxDEV(
                        ProtectedRoute,
                        {
                          children: _jsxDEV(Profile, {}, void 0, false),
                        },
                        void 0,
                        false
                      ),
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    Route,
                    {
                      path: '*',
                      element: _jsxDEV(NotFound, {}, void 0, false),
                    },
                    void 0,
                    false
                  ),
                ],
              },
              void 0,
              true
            ),
          },
          void 0,
          false
        ),
        _jsxDEV(Footer, {}, void 0, false),
      ],
    },
    void 0,
    true
  );
}
export default App;
