import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  return _jsxDEV(
    'div',
    {
      className: 'auth-page',
      children: _jsxDEV(
        'div',
        {
          className: 'auth-card animate-fadeIn',
          children: [
            _jsxDEV(
              'h1',
              {
                children: 'Welcome Back',
              },
              void 0,
              false
            ),
            _jsxDEV(
              'p',
              {
                className: 'auth-subtitle',
                children: 'Log in to your NexusFund account',
              },
              void 0,
              false
            ),
            _jsxDEV(
              'form',
              {
                onSubmit: handleSubmit(onSubmit),
                children: [
                  _jsxDEV(
                    'div',
                    {
                      className: 'form-group',
                      children: [
                        _jsxDEV(
                          'label',
                          {
                            className: 'form-label',
                            htmlFor: 'login-email',
                            children: 'Email',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'input',
                          {
                            id: 'login-email',
                            type: 'email',
                            className: `form-input ${errors.email ? 'form-input-error' : ''}`,
                            placeholder: 'you@example.com',
                            ...register('email', {
                              required: 'Email is required',
                            }),
                          },
                          void 0,
                          false
                        ),
                        errors.email &&
                          _jsxDEV(
                            'span',
                            {
                              className: 'form-error',
                              children: errors.email.message,
                            },
                            void 0,
                            false
                          ),
                      ],
                    },
                    void 0,
                    true
                  ),
                  _jsxDEV(
                    'div',
                    {
                      className: 'form-group',
                      children: [
                        _jsxDEV(
                          'div',
                          {
                            className: 'flex justify-between items-center',
                            children: [
                              _jsxDEV(
                                'label',
                                {
                                  className: 'form-label',
                                  htmlFor: 'login-password',
                                  children: 'Password',
                                },
                                void 0,
                                false
                              ),
                              _jsxDEV(
                                Link,
                                {
                                  to: '#',
                                  className: 'text-xs text-primary',
                                  style: {
                                    fontWeight: 'var(--font-medium)',
                                  },
                                  children: 'Forgot password?',
                                },
                                void 0,
                                false
                              ),
                            ],
                          },
                          void 0,
                          true
                        ),
                        _jsxDEV(
                          'input',
                          {
                            id: 'login-password',
                            type: 'password',
                            className: `form-input ${errors.password ? 'form-input-error' : ''}`,
                            placeholder: 'Enter your password',
                            ...register('password', {
                              required: 'Password is required',
                            }),
                          },
                          void 0,
                          false
                        ),
                        errors.password &&
                          _jsxDEV(
                            'span',
                            {
                              className: 'form-error',
                              children: errors.password.message,
                            },
                            void 0,
                            false
                          ),
                      ],
                    },
                    void 0,
                    true
                  ),
                  _jsxDEV(
                    'button',
                    {
                      type: 'submit',
                      className: 'btn btn-primary btn-lg btn-full',
                      disabled: loading,
                      id: 'login-submit',
                      children: loading
                        ? _jsxDEV(
                            'div',
                            {
                              className: 'spinner spinner-sm',
                              style: {
                                borderTopColor: '#fff',
                                borderColor: 'rgba(255,255,255,0.3)',
                              },
                            },
                            void 0,
                            false
                          )
                        : 'Log In',
                    },
                    void 0,
                    false
                  ),
                ],
              },
              void 0,
              true
            ),
            _jsxDEV(
              'p',
              {
                className: 'auth-footer',
                children: [
                  "Don't have an account? ",
                  _jsxDEV(
                    Link,
                    {
                      to: '/register',
                      children: 'Sign up',
                    },
                    void 0,
                    false
                  ),
                ],
              },
              void 0,
              true
            ),
          ],
        },
        void 0,
        true
      ),
    },
    void 0,
    false
  );
}
