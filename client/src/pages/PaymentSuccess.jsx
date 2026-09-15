import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: _jsxDEV(
        'div',
        {
          className: 'container',
          children: _jsxDEV(
            motion.div,
            {
              className: 'success-page',
              initial: {
                opacity: 0,
                scale: 0.95,
              },
              animate: {
                opacity: 1,
                scale: 1,
              },
              transition: {
                duration: 0.5,
              },
              children: [
                _jsxDEV(
                  'div',
                  {
                    className: 'success-icon',
                    children: _jsxDEV(
                      'svg',
                      {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: '2.5',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        children: _jsxDEV(
                          'polyline',
                          {
                            points: '20 6 9 17 4 12',
                          },
                          void 0,
                          false
                        ),
                      },
                      void 0,
                      false
                    ),
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'h1',
                  {
                    style: {
                      fontSize: 'var(--text-3xl)',
                      marginBottom: 'var(--space-4)',
                    },
                    children: 'Thank You!',
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'p',
                  {
                    className: 'text-secondary',
                    style: {
                      fontSize: 'var(--text-lg)',
                      maxWidth: '500px',
                      margin: '0 auto var(--space-8)',
                    },
                    children:
                      "Your donation was processed successfully. You're making a real difference in someone's life.",
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'div',
                  {
                    className: 'flex justify-center gap-4',
                    children: [
                      _jsxDEV(
                        Link,
                        {
                          to: '/explore',
                          className: 'btn btn-primary btn-lg',
                          children: 'Explore More Campaigns',
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        Link,
                        {
                          to: '/dashboard',
                          className: 'btn btn-outline btn-lg',
                          children: 'Go to Dashboard',
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
    },
    void 0,
    false
  );
}
