import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="not-found animate-fadeIn">
          <h1>404</h1>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Page Not Found</h2>
          <p className="text-secondary" style={{ marginBottom: 'var(--space-8)', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="btn btn-primary btn-lg">Go Home</Link>
            <Link to="/explore" className="btn btn-outline btn-lg">Explore Campaigns</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
