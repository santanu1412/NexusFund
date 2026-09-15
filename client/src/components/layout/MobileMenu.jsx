import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from 'react/jsx-dev-runtime';
export default function MobileMenu({ onClose }) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    onClose();
  };
  return _jsxDEV(
    AnimatePresence,
    {
      children: [
        _jsxDEV(
          motion.div,
          {
            className: 'mobile-menu-overlay',
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
            exit: {
              opacity: 0,
            },
            onClick: onClose,
          },
          void 0,
          false
        ),
        _jsxDEV(
          motion.div,
          {
            className: 'mobile-menu',
            initial: {
              x: '100%',
            },
            animate: {
              x: 0,
            },
            exit: {
              x: '100%',
            },
            transition: {
              type: 'spring',
              damping: 25,
              stiffness: 300,
            },
            children: [
              _jsxDEV(
                'div',
                {
                  className: 'mobile-menu-header',
                  children: [
                    _jsxDEV(
                      'span',
                      {
                        className: 'font-semibold',
                        style: {
                          fontSize: 'var(--text-lg)',
                          color: 'var(--color-text)',
                        },
                        children: 'Menu',
                      },
                      void 0,
                      false
                    ),
                    _jsxDEV(
                      'button',
                      {
                        onClick: onClose,
                        className: 'btn-icon',
                        'aria-label': 'Close menu',
                        children: _jsxDEV(
                          'svg',
                          {
                            width: '24',
                            height: '24',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                            children: [
                              _jsxDEV(
                                'line',
                                {
                                  x1: '18',
                                  y1: '6',
                                  x2: '6',
                                  y2: '18',
                                },
                                void 0,
                                false
                              ),
                              _jsxDEV(
                                'line',
                                {
                                  x1: '6',
                                  y1: '6',
                                  x2: '18',
                                  y2: '18',
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
                  ],
                },
                void 0,
                true
              ),
              _jsxDEV(
                NavLink,
                {
                  to: '/explore',
                  className: ({ isActive }) =>
                    `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`,
                  onClick: onClose,
                  children: [
                    _jsxDEV(
                      'svg',
                      {
                        width: '20',
                        height: '20',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '2',
                        children: [
                          _jsxDEV(
                            'circle',
                            {
                              cx: '11',
                              cy: '11',
                              r: '8',
                            },
                            void 0,
                            false
                          ),
                          _jsxDEV(
                            'line',
                            {
                              x1: '21',
                              y1: '21',
                              x2: '16.65',
                              y2: '16.65',
                            },
                            void 0,
                            false
                          ),
                        ],
                      },
                      void 0,
                      true
                    ),
                    'Explore',
                  ],
                },
                void 0,
                true
              ),
              _jsxDEV(
                NavLink,
                {
                  to: '/how-it-works',
                  className: ({ isActive }) =>
                    `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`,
                  onClick: onClose,
                  children: [
                    _jsxDEV(
                      'svg',
                      {
                        width: '20',
                        height: '20',
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
                            'path',
                            {
                              d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3',
                            },
                            void 0,
                            false
                          ),
                          _jsxDEV(
                            'line',
                            {
                              x1: '12',
                              y1: '17',
                              x2: '12.01',
                              y2: '17',
                            },
                            void 0,
                            false
                          ),
                        ],
                      },
                      void 0,
                      true
                    ),
                    'How It Works',
                  ],
                },
                void 0,
                true
              ),
              isAuthenticated &&
                _jsxDEV(
                  _Fragment,
                  {
                    children: [
                      _jsxDEV(
                        NavLink,
                        {
                          to: '/create',
                          className: ({ isActive }) =>
                            `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`,
                          onClick: onClose,
                          children: [
                            _jsxDEV(
                              'svg',
                              {
                                width: '20',
                                height: '20',
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
                            'Start a Campaign',
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        NavLink,
                        {
                          to: '/dashboard',
                          className: ({ isActive }) =>
                            `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`,
                          onClick: onClose,
                          children: [
                            _jsxDEV(
                              'svg',
                              {
                                width: '20',
                                height: '20',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                children: [
                                  _jsxDEV(
                                    'rect',
                                    {
                                      x: '3',
                                      y: '3',
                                      width: '7',
                                      height: '7',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'rect',
                                    {
                                      x: '14',
                                      y: '3',
                                      width: '7',
                                      height: '7',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'rect',
                                    {
                                      x: '14',
                                      y: '14',
                                      width: '7',
                                      height: '7',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'rect',
                                    {
                                      x: '3',
                                      y: '14',
                                      width: '7',
                                      height: '7',
                                    },
                                    void 0,
                                    false
                                  ),
                                ],
                              },
                              void 0,
                              true
                            ),
                            'Dashboard',
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        NavLink,
                        {
                          to: '/profile',
                          className: ({ isActive }) =>
                            `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`,
                          onClick: onClose,
                          children: [
                            _jsxDEV(
                              'svg',
                              {
                                width: '20',
                                height: '20',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                children: [
                                  _jsxDEV(
                                    'path',
                                    {
                                      d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'circle',
                                    {
                                      cx: '12',
                                      cy: '7',
                                      r: '4',
                                    },
                                    void 0,
                                    false
                                  ),
                                ],
                              },
                              void 0,
                              true
                            ),
                            'Profile',
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
                'div',
                {
                  className: 'divider',
                },
                void 0,
                false
              ),
              isAuthenticated
                ? _jsxDEV(
                    _Fragment,
                    {
                      children: [
                        _jsxDEV(
                          'div',
                          {
                            style: {
                              padding: 'var(--space-3) var(--space-4)',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-text-muted)',
                            },
                            children: [
                              'Signed in as ',
                              _jsxDEV(
                                'strong',
                                {
                                  style: {
                                    color: 'var(--color-text)',
                                  },
                                  children: user?.name,
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
                            className: 'mobile-menu-link',
                            onClick: handleLogout,
                            style: {
                              color: 'var(--color-error)',
                            },
                            children: [
                              _jsxDEV(
                                'svg',
                                {
                                  width: '20',
                                  height: '20',
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  children: [
                                    _jsxDEV(
                                      'path',
                                      {
                                        d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
                                      },
                                      void 0,
                                      false
                                    ),
                                    _jsxDEV(
                                      'polyline',
                                      {
                                        points: '16,17 21,12 16,7',
                                      },
                                      void 0,
                                      false
                                    ),
                                    _jsxDEV(
                                      'line',
                                      {
                                        x1: '21',
                                        y1: '12',
                                        x2: '9',
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
                              'Log out',
                            ],
                          },
                          void 0,
                          true
                        ),
                      ],
                    },
                    void 0,
                    true
                  )
                : _jsxDEV(
                    'div',
                    {
                      className: 'flex flex-col gap-3',
                      style: {
                        padding: '0 var(--space-4)',
                      },
                      children: [
                        _jsxDEV(
                          Link,
                          {
                            to: '/login',
                            className: 'btn btn-outline btn-full',
                            onClick: onClose,
                            children: 'Log in',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          Link,
                          {
                            to: '/register',
                            className: 'btn btn-primary btn-full',
                            onClick: onClose,
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
      ],
    },
    void 0,
    true
  );
}
