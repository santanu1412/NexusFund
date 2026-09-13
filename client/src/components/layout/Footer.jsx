import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="navbar-logo" style={{ color: '#fff', fontSize: '1.25rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              NexusFund
            </Link>
            <p>A simple crowdfunding platform for everyone. Create campaigns, share your story, and fund what matters to you.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Platform</h4>
            <Link to="/explore" className="footer-link">Explore Campaigns</Link>
            <Link to="/create" className="footer-link">Start a Campaign</Link>
            <Link to="/how-it-works" className="footer-link">How It Works</Link>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-heading">Support</h4>
            <Link to="/how-it-works" className="footer-link">FAQs</Link>
            <a href="mailto:support@nexusfund.com" className="footer-link">Contact Us</a>
            <Link to="/how-it-works" className="footer-link">Trust & Safety</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} NexusFund. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="footer-link" style={{ padding: 0 }}>Privacy</a>
            <a href="#" className="footer-link" style={{ padding: 0 }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
