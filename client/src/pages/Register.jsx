import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('donor');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password, role);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
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
                children: 'Create Account',
              },
              void 0,
              false
            ),
            _jsxDEV(
              'p',
              {
                className: 'auth-subtitle',
                children: 'Join NexusFund and start making a difference',
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
                            htmlFor: 'register-name',
                            children: 'Full Name',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'input',
                          {
                            id: 'register-name',
                            type: 'text',
                            className: `form-input ${errors.name ? 'form-input-error' : ''}`,
                            placeholder: 'John Doe',
                            ...register('name', {
                              required: 'Name is required',
                              maxLength: {
                                value: 50,
                                message: 'Max 50 characters',
                              },
                            }),
                          },
                          void 0,
                          false
                        ),
                        errors.name &&
                          _jsxDEV(
                            'span',
                            {
                              className: 'form-error',
                              children: errors.name.message,
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
                          'label',
                          {
                            className: 'form-label',
                            htmlFor: 'register-email',
                            children: 'Email',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'input',
                          {
                            id: 'register-email',
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
                          'label',
                          {
                            className: 'form-label',
                            htmlFor: 'register-password',
                            children: 'Password',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'input',
                          {
                            id: 'register-password',
                            type: 'password',
                            className: `form-input ${errors.password ? 'form-input-error' : ''}`,
                            placeholder: 'At least 6 characters',
                            ...register('password', {
                              required: 'Password is required',
                              minLength: {
                                value: 6,
                                message: 'At least 6 characters',
                              },
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
                    'div',
                    {
                      className: 'form-group',
                      children: [
                        _jsxDEV(
                          'label',
                          {
                            className: 'form-label',
                            htmlFor: 'register-confirm',
                            children: 'Confirm Password',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'input',
                          {
                            id: 'register-confirm',
                            type: 'password',
                            className: `form-input ${errors.confirmPassword ? 'form-input-error' : ''}`,
                            placeholder: 'Repeat your password',
                            ...register('confirmPassword', {
                              required: 'Please confirm your password',
                              validate: (value) => value === password || 'Passwords do not match',
                            }),
                          },
                          void 0,
                          false
                        ),
                        errors.confirmPassword &&
                          _jsxDEV(
                            'span',
                            {
                              className: 'form-error',
                              children: errors.confirmPassword.message,
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
                          'label',
                          {
                            className: 'form-label',
                            children: 'I want to...',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'div',
                          {
                            className: 'role-selector',
                            children: [
                              _jsxDEV(
                                'button',
                                {
                                  type: 'button',
                                  className: `role-option ${role === 'donor' ? 'role-option-selected' : ''}`,
                                  onClick: () => setRole('donor'),
                                  children: [
                                    _jsxDEV(
                                      'svg',
                                      {
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        strokeWidth: '2',
                                        children: _jsxDEV(
                                          'path',
                                          {
                                            d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
                                          },
                                          void 0,
                                          false
                                        ),
                                      },
                                      void 0,
                                      false
                                    ),
                                    _jsxDEV(
                                      'span',
                                      {
                                        children: 'Support causes',
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
                                  type: 'button',
                                  className: `role-option ${role === 'beneficiary' ? 'role-option-selected' : ''}`,
                                  onClick: () => setRole('beneficiary'),
                                  children: [
                                    _jsxDEV(
                                      'svg',
                                      {
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        strokeWidth: '2',
                                        children: [
                                          _jsxDEV(
                                            'circle',
                                            {
                                              cx: '12',
                                              cy: '12',
                                              r: '10',
                                            },
                                            void 0,
                                            false
                                          ),
                                          _jsxDEV(
                                            'line',
                                            {
                                              x1: '12',
                                              y1: '8',
                                              x2: '12',
                                              y2: '16',
                                            },
                                            void 0,
                                            false
                                          ),
                                          _jsxDEV(
                                            'line',
                                            {
                                              x1: '8',
                                              y1: '12',
                                              x2: '16',
                                              y2: '12',
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
                                      'span',
                                      {
                                        children: 'Create campaigns',
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
                      id: 'register-submit',
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
                        : 'Create Account',
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
                  'Already have an account? ',
                  _jsxDEV(
                    Link,
                    {
                      to: '/login',
                      children: 'Log in',
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
