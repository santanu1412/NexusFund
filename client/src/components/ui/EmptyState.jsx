import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function EmptyState({ icon, title, description, action }) {
  return _jsxDEV(
    'div',
    {
      className: 'empty-state animate-fadeIn',
      children: [
        icon ||
          _jsxDEV(
            'svg',
            {
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '1.5',
              children: _jsxDEV(
                'path',
                {
                  d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
                },
                void 0,
                false
              ),
            },
            void 0,
            false
          ),
        _jsxDEV(
          'h3',
          {
            children: title,
          },
          void 0,
          false
        ),
        _jsxDEV(
          'p',
          {
            children: description,
          },
          void 0,
          false
        ),
        action,
      ],
    },
    void 0,
    true
  );
}
