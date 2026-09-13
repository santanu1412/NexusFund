import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({ onClose }) {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="mobile-menu-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="mobile-menu"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="mobile-menu-header">
          <span className="font-semibold" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>Menu</span>
          <button onClick={onClose} className="btn-icon" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <NavLink to="/explore" className={({ isActive }) => `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          Explore
        </NavLink>
        <NavLink to="/how-it-works" className={({ isActive }) => `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          How It Works
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/create" className={({ isActive }) => `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Start a Campaign
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `mobile-menu-link ${isActive ? 'mobile-menu-link-active' : ''}`} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              Profile
            </NavLink>
          </>
        )}

        <div className="divider" />

        {isAuthenticated ? (
          <>
            <div style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              Signed in as <strong style={{ color: 'var(--color-text)' }}>{user?.name}</strong>
            </div>
            <button className="mobile-menu-link" onClick={handleLogout} style={{ color: 'var(--color-error)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Log out
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3" style={{ padding: '0 var(--space-4)' }}>
            <Link to="/login" className="btn btn-outline btn-full" onClick={onClose}>Log in</Link>
            <Link to="/register" className="btn btn-primary btn-full" onClick={onClose}>Sign up</Link>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
