import { Link } from 'react-router-dom';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function NotFound() {
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: _jsxDEV(
        'div',
        {
          className: 'container',
          children: _jsxDEV(
            'div',
            {
              className: 'not-found animate-fadeIn',
              children: [
                _jsxDEV(
                  'h1',
                  {
                    children: '404',
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'h2',
                  {
                    style: {
                      marginBottom: 'var(--space-4)',
                    },
                    children: 'Page Not Found',
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'p',
                  {
                    className: 'text-secondary',
                    style: {
                      marginBottom: 'var(--space-8)',
                      maxWidth: '400px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    },
                    children: "The page you're looking for doesn't exist or has been moved.",
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
                          to: '/',
                          className: 'btn btn-primary btn-lg',
                          children: 'Go Home',
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        Link,
                        {
                          to: '/explore',
                          className: 'btn btn-outline btn-lg',
                          children: 'Explore Campaigns',
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
