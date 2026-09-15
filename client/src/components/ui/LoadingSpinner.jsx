import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function LoadingSpinner({ size = 'default', text = '' }) {
  const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';
  return _jsxDEV(
    'div',
    {
      className: 'flex flex-col items-center justify-center gap-4',
      style: {
        padding: 'var(--space-12) 0',
      },
      children: [
        _jsxDEV(
          'div',
          {
            className: `spinner ${sizeClass}`,
          },
          void 0,
          false
        ),
        text &&
          _jsxDEV(
            'p',
            {
              className: 'text-sm text-muted',
              children: text,
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
