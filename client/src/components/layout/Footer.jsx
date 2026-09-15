import { Link } from 'react-router-dom';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function Footer() {
  return _jsxDEV(
    'footer',
    {
      className: 'footer',
      children: _jsxDEV(
        'div',
        {
          className: 'container',
          children: [
            _jsxDEV(
              'div',
              {
                className: 'footer-grid',
                children: [
                  _jsxDEV(
                    'div',
                    {
                      className: 'footer-brand',
                      children: [
                        _jsxDEV(
                          Link,
                          {
                            to: '/',
                            className: 'navbar-logo',
                            style: {
                              color: '#fff',
                              fontSize: '1.25rem',
                            },
                            children: [
                              _jsxDEV(
                                'svg',
                                {
                                  width: '24',
                                  height: '24',
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
                          'p',
                          {
                            children:
                              'A simple crowdfunding platform for everyone. Create campaigns, share your story, and fund what matters to you.',
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
                      children: [
                        _jsxDEV(
                          'h4',
                          {
                            className: 'footer-heading',
                            children: 'Platform',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          Link,
                          {
                            to: '/explore',
                            className: 'footer-link',
                            children: 'Explore Campaigns',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          Link,
                          {
                            to: '/create',
                            className: 'footer-link',
                            children: 'Start a Campaign',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          Link,
                          {
                            to: '/how-it-works',
                            className: 'footer-link',
                            children: 'How It Works',
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
                      children: [
                        _jsxDEV(
                          'h4',
                          {
                            className: 'footer-heading',
                            children: 'Support',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          Link,
                          {
                            to: '/how-it-works',
                            className: 'footer-link',
                            children: 'FAQs',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'a',
                          {
                            href: 'mailto:support@nexusfund.com',
                            className: 'footer-link',
                            children: 'Contact Us',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          Link,
                          {
                            to: '/how-it-works',
                            className: 'footer-link',
                            children: 'Trust & Safety',
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
            _jsxDEV(
              'div',
              {
                className: 'footer-bottom',
                children: [
                  _jsxDEV(
                    'span',
                    {
                      children: [
                        '© ',
                        new Date().getFullYear(),
                        ' NexusFund. All rights reserved.',
                      ],
                    },
                    void 0,
                    true
                  ),
                  _jsxDEV(
                    'div',
                    {
                      className: 'flex gap-6',
                      children: [
                        _jsxDEV(
                          'a',
                          {
                            href: '#',
                            className: 'footer-link',
                            style: {
                              padding: 0,
                            },
                            children: 'Privacy',
                          },
                          void 0,
                          false
                        ),
                        _jsxDEV(
                          'a',
                          {
                            href: '#',
                            className: 'footer-link',
                            style: {
                              padding: 0,
                            },
                            children: 'Terms',
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
    },
    void 0,
    false
  );
}
