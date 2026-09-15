import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
const presets = [10, 25, 50, 100];
export default function DonateModal({ campaign, onClose }) {
  const { isAuthenticated } = useAuthStore();
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [loading, setLoading] = useState(false);
  const amount = selectedPreset || Number(customAmount) || 0;
  const handlePresetClick = (value) => {
    setSelectedPreset(value);
    setCustomAmount('');
  };
  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };
  const handleDonate = async () => {
    if (amount < 1) {
      toast.error('Minimum donation is $1');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post(`/donations/checkout/${campaign._id}`, {
        amountCents: Math.round(amount * 100),
        isAnonymous,
        message,
        guestName: !isAuthenticated ? guestName || 'Anonymous Guest' : undefined,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create checkout session');
      setLoading(false);
    }
  };
  return _jsxDEV(
    AnimatePresence,
    {
      children: _jsxDEV(
        motion.div,
        {
          className: 'modal-backdrop',
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
          children: _jsxDEV(
            motion.div,
            {
              className: 'modal animate-scaleIn',
              onClick: (e) => e.stopPropagation(),
              initial: {
                opacity: 0,
                scale: 0.95,
              },
              animate: {
                opacity: 1,
                scale: 1,
              },
              exit: {
                opacity: 0,
                scale: 0.95,
              },
              children: [
                _jsxDEV(
                  'div',
                  {
                    className: 'modal-header',
                    children: [
                      _jsxDEV(
                        'h3',
                        {
                          style: {
                            fontSize: 'var(--text-lg)',
                          },
                          children: 'Support this campaign',
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'button',
                        {
                          onClick: onClose,
                          className: 'btn-icon',
                          'aria-label': 'Close',
                          children: _jsxDEV(
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
                  'div',
                  {
                    className: 'modal-body',
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-5)',
                    },
                    children: [
                      _jsxDEV(
                        'p',
                        {
                          className: 'text-sm text-secondary',
                          children: [
                            'Donating to ',
                            _jsxDEV(
                              'strong',
                              {
                                style: {
                                  color: 'var(--color-text)',
                                },
                                children: campaign.title,
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
                          className: 'donate-presets',
                          children: presets.map((value) =>
                            _jsxDEV(
                              'button',
                              {
                                className: `donate-preset ${selectedPreset === value ? 'donate-preset-active' : ''}`,
                                onClick: () => handlePresetClick(value),
                                children: ['$', value],
                              },
                              value,
                              true
                            )
                          ),
                        },
                        void 0,
                        false
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
                                children: 'Custom amount',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'div',
                              {
                                style: {
                                  position: 'relative',
                                },
                                children: [
                                  _jsxDEV(
                                    'span',
                                    {
                                      style: {
                                        position: 'absolute',
                                        left: 'var(--space-4)',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-muted)',
                                        fontWeight: 'var(--font-medium)',
                                      },
                                      children: '$',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'input',
                                    {
                                      type: 'number',
                                      className: 'form-input',
                                      placeholder: 'Enter amount',
                                      value: customAmount,
                                      onChange: handleCustomChange,
                                      min: '1',
                                      style: {
                                        paddingLeft: 'var(--space-8)',
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
                      _jsxDEV(
                        'div',
                        {
                          className: 'form-group',
                          children: [
                            _jsxDEV(
                              'label',
                              {
                                className: 'form-label',
                                children: 'Leave a message (optional)',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'textarea',
                              {
                                className: 'form-input',
                                placeholder: 'Words of encouragement...',
                                value: message,
                                onChange: (e) => setMessage(e.target.value),
                                rows: 2,
                                maxLength: 500,
                                style: {
                                  minHeight: '60px',
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
                      !isAuthenticated &&
                        _jsxDEV(
                          'div',
                          {
                            className: 'form-group',
                            children: [
                              _jsxDEV(
                                'label',
                                {
                                  className: 'form-label',
                                  children: 'Your name',
                                },
                                void 0,
                                false
                              ),
                              _jsxDEV(
                                'input',
                                {
                                  type: 'text',
                                  className: 'form-input',
                                  placeholder: 'Your name (optional)',
                                  value: guestName,
                                  onChange: (e) => setGuestName(e.target.value),
                                  maxLength: 100,
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
                        'label',
                        {
                          className: 'flex items-center gap-3',
                          style: {
                            cursor: 'pointer',
                          },
                          children: [
                            _jsxDEV(
                              'input',
                              {
                                type: 'checkbox',
                                checked: isAnonymous,
                                onChange: (e) => setIsAnonymous(e.target.checked),
                                style: {
                                  width: '18px',
                                  height: '18px',
                                  accentColor: 'var(--color-primary)',
                                },
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'span',
                              {
                                className: 'text-sm',
                                children: 'Donate anonymously',
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
                    className: 'modal-footer',
                    children: [
                      _jsxDEV(
                        'button',
                        {
                          className: 'btn btn-ghost',
                          onClick: onClose,
                          children: 'Cancel',
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'button',
                        {
                          className: 'btn btn-secondary btn-lg',
                          onClick: handleDonate,
                          disabled: loading || amount < 1,
                          style: {
                            minWidth: '140px',
                          },
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
                            : `Donate $${amount > 0 ? amount.toLocaleString() : '0'}`,
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
