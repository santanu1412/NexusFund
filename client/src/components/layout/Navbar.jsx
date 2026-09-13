import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import MobileMenu from './MobileMenu';

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

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            NexusFund
          </Link>

          {/* Nav Links */}
          <div className="navbar-links">
            <NavLink to="/explore" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>
              Explore
            </NavLink>
            <NavLink to="/how-it-works" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>
              How It Works
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/create" className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}>
                Start a Campaign
              </NavLink>
            )}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="navbar-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="avatar avatar-sm">
                  {user?.avatar && user.avatar !== '/default-avatar.png' ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    getInitial(user?.name)
                  )}
                </div>
                <span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{user?.name}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ color: 'var(--color-text-muted)' }}>
                  <path d="M6 8L1 3h10z" />
                </svg>

                {dropdownOpen && (
                  <div className="navbar-dropdown animate-scaleIn">
                    <Link to="/dashboard" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                      Dashboard
                    </Link>
                    <Link to="/profile" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      Profile
                    </Link>
                    <div className="navbar-dropdown-divider" />
                    <button className="navbar-dropdown-item" onClick={handleLogout} style={{ color: 'var(--color-error)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Log in</Link>
                <Link to="/register" className="btn btn-primary">Sign up</Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button className="mobile-menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <MobileMenu onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}
