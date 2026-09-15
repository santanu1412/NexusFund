import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function SkeletonCard() {
  return _jsxDEV(
    'div',
    {
      className: 'card',
      style: {
        cursor: 'default',
      },
      children: [
        _jsxDEV(
          'div',
          {
            className: 'skeleton',
            style: {
              aspectRatio: '16/9',
            },
          },
          void 0,
          false
        ),
        _jsxDEV(
          'div',
          {
            className: 'card-body',
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            },
            children: [
              _jsxDEV(
                'div',
                {
                  className: 'skeleton',
                  style: {
                    height: '12px',
                    width: '60px',
                    borderRadius: 'var(--radius-full)',
                  },
                },
                void 0,
                false
              ),
              _jsxDEV(
                'div',
                {
                  className: 'skeleton',
                  style: {
                    height: '20px',
                    width: '85%',
                  },
                },
                void 0,
                false
              ),
              _jsxDEV(
                'div',
                {
                  className: 'skeleton',
                  style: {
                    height: '14px',
                    width: '60%',
                  },
                },
                void 0,
                false
              ),
              _jsxDEV(
                'div',
                {
                  className: 'skeleton',
                  style: {
                    height: '8px',
                    width: '100%',
                    marginTop: 'var(--space-2)',
                  },
                },
                void 0,
                false
              ),
              _jsxDEV(
                'div',
                {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                  children: [
                    _jsxDEV(
                      'div',
                      {
                        className: 'skeleton',
                        style: {
                          height: '14px',
                          width: '90px',
                        },
                      },
                      void 0,
                      false
                    ),
                    _jsxDEV(
                      'div',
                      {
                        className: 'skeleton',
                        style: {
                          height: '14px',
                          width: '70px',
                        },
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
