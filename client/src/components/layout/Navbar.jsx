import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import MobileMenu from './MobileMenu';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from 'react/jsx-dev-runtime';
export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.navbar-user')) setDropdownOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/');
  };
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');
  return _jsxDEV(
    _Fragment,
    {
      children: [
        _jsxDEV(
          'nav',
          {
            className: `navbar ${scrolled ? 'navbar-scrolled' : ''}`,
            children: _jsxDEV(
              'div',
              {
                className: 'navbar-inner',
                children: [
                  _jsxDEV(
                    Link,
                    {
                      to: '/',
                      className: 'navbar-logo',
                      children: [
                        _jsxDEV(
                          'svg',
                          {
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
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
                        'NexusFund',
                      ],
                    },
                    void 0,
                    true
                  ),
                  _jsxDEV(
                    'div',
                    {
                      className: 'navbar-links',
                      children: [
                        _jsxDEV(
                          NavLink,
                          {
                            to: '/explore',
                            className: ({ isActive }) =>
                              `navbar-link ${isActive ? 'navbar-link-active' : ''}`,
                            children: 'Explore',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          NavLink,
                          {
                            to: '/how-it-works',
                            className: ({ isActive }) =>
                              `navbar-link ${isActive ? 'navbar-link-active' : ''}`,
                            children: 'How It Works',
                          },
                          void 0,
                          false
                        ),
                        isAuthenticated &&
                          _jsxDEV(
                            NavLink,
                            {
                              to: '/create',
                              className: ({ isActive }) =>
                                `navbar-link ${isActive ? 'navbar-link-active' : ''}`,
                              children: 'Start a Campaign',
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
                      className: 'navbar-actions',
                      children: [
                        isAuthenticated
                          ? _jsxDEV(
                              'div',
                              {
                                className: 'navbar-user',
                                onClick: () => setDropdownOpen(!dropdownOpen),
                                children: [
                                  _jsxDEV(
                                    'div',
                                    {
                                      className: 'avatar avatar-sm',
                                      children:
                                        user?.avatar && user.avatar !== '/default-avatar.png'
                                          ? _jsxDEV(
                                              'img',
                                              {
                                                src: user.avatar,
                                                alt: user.name,
                                                style: {
                                                  width: '100%',
                                                  height: '100%',
                                                  borderRadius: '50%',
                                                  objectFit: 'cover',
                                                },
                                              },
                                              void 0,
                                              false
                                            )
                                          : getInitial(user?.name),
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'span',
                                    {
                                      className: 'font-medium text-sm',
                                      style: {
                                        color: 'var(--color-text)',
                                      },
                                      children: user?.name,
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'svg',
                                    {
                                      width: '12',
                                      height: '12',
                                      viewBox: '0 0 12 12',
                                      fill: 'currentColor',
                                      style: {
                                        color: 'var(--color-text-muted)',
                                      },
                                      children: _jsxDEV(
                                        'path',
                                        {
                                          d: 'M6 8L1 3h10z',
                                        },
                                        void 0,
                                        false
                                      ),
                                    },
                                    void 0,
                                    false
                                  ),
                                  dropdownOpen &&
                                    _jsxDEV(
                                      'div',
                                      {
                                        className: 'navbar-dropdown animate-scaleIn',
                                        children: [
                                          _jsxDEV(
                                            Link,
                                            {
                                              to: '/dashboard',
                                              className: 'navbar-dropdown-item',
                                              onClick: () => setDropdownOpen(false),
                                              children: [
                                                _jsxDEV(
                                                  'svg',
                                                  {
                                                    width: '16',
                                                    height: '16',
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
                                            Link,
                                            {
                                              to: '/profile',
                                              className: 'navbar-dropdown-item',
                                              onClick: () => setDropdownOpen(false),
                                              children: [
                                                _jsxDEV(
                                                  'svg',
                                                  {
                                                    width: '16',
                                                    height: '16',
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
                                          _jsxDEV(
                                            'div',
                                            {
                                              className: 'navbar-dropdown-divider',
                                            },
                                            void 0,
                                            false
                                          ),
                                          _jsxDEV(
                                            'button',
                                            {
                                              className: 'navbar-dropdown-item',
                                              onClick: handleLogout,
                                              style: {
                                                color: 'var(--color-error)',
                                              },
                                              children: [
                                                _jsxDEV(
                                                  'svg',
                                                  {
                                                    width: '16',
                                                    height: '16',
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
                                    ),
                                ],
                              },
                              void 0,
                              true
                            )
                          : _jsxDEV(
                              _Fragment,
                              {
                                children: [
                                  _jsxDEV(
                                    Link,
                                    {
                                      to: '/login',
                                      className: 'btn btn-ghost',
                                      children: 'Log in',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    Link,
                                    {
                                      to: '/register',
                                      className: 'btn btn-primary',
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
                        _jsxDEV(
                          'button',
                          {
                            className: 'mobile-menu-toggle',
                            onClick: () => setMobileOpen(true),
                            'aria-label': 'Open menu',
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
                                      x1: '3',
                                      y1: '6',
                                      x2: '21',
                                      y2: '6',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'line',
                                    {
                                      x1: '3',
                                      y1: '12',
                                      x2: '21',
                                      y2: '12',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'line',
                                    {
                                      x1: '3',
                                      y1: '18',
                                      x2: '21',
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
                ],
              },
              void 0,
              true
            ),
          },
          void 0,
          false
        ),
        mobileOpen &&
          _jsxDEV(
            MobileMenu,
            {
              onClose: () => setMobileOpen(false),
            },
            void 0,
            false
          ),
      ],
    },
    void 0,
    true
  );
}
