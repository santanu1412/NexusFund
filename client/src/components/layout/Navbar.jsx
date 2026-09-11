import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet hover:opacity-80 transition-opacity">
          NEXUS<span className="text-white">FUND</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/explore" className="text-sm font-medium hover:text-cyan transition-colors">Explore</Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-cyan transition-colors">How it Works</Link>
          
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/create" className="text-sm font-bold text-cyan hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] transition-all">
                + Start Campaign
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-dark border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-white/5 text-sm">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm text-red-400">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:text-white/80">Log In</Link>
              <Link 
                to="/register" 
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan hover:bg-cyan/10 hover:text-cyan transition-all duration-300 text-sm font-bold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;