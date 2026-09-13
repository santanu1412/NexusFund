import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';
import toast from 'react-hot-toast';

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
        guestName: !isAuthenticated ? (guestName || 'Anonymous Guest') : undefined,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create checkout session');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          {/* Header */}
          <div className="modal-header">
            <h3 style={{ fontSize: 'var(--text-lg)' }}>Support this campaign</h3>
            <button onClick={onClose} className="btn-icon" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Campaign Title */}
            <p className="text-sm text-secondary">Donating to <strong style={{ color: 'var(--color-text)' }}>{campaign.title}</strong></p>

            {/* Preset Amounts */}
            <div className="donate-presets">
              {presets.map((value) => (
                <button
                  key={value}
                  className={`donate-preset ${selectedPreset === value ? 'donate-preset-active' : ''}`}
                  onClick={() => handlePresetClick(value)}
                >
                  ${value}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="form-group">
              <label className="form-label">Custom amount</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)', fontWeight: 'var(--font-medium)'
                }}>$</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  min="1"
                  style={{ paddingLeft: 'var(--space-8)' }}
                />
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label">Leave a message (optional)</label>
              <textarea
                className="form-input"
                placeholder="Words of encouragement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                maxLength={500}
                style={{ minHeight: '60px' }}
              />
            </div>

            {/* Guest Name (if not authenticated) */}
            {!isAuthenticated && (
              <div className="form-group">
                <label className="form-label">Your name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your name (optional)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  maxLength={100}
                />
              </div>
            )}

            {/* Anonymous Toggle */}
            <label className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
              />
              <span className="text-sm">Donate anonymously</span>
            </label>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={handleDonate}
              disabled={loading || amount < 1}
              style={{ minWidth: '140px' }}
            >
              {loading ? (
                <div className="spinner spinner-sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
              ) : (
                `Donate $${amount > 0 ? amount.toLocaleString() : '0'}`
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
