import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="page-content">
      <div className="container">
        <motion.div
          className="success-page"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>Thank You!</h1>
          <p className="text-secondary" style={{ fontSize: 'var(--text-lg)', maxWidth: '500px', margin: '0 auto var(--space-8)' }}>
            Your donation was processed successfully. You're making a real difference in someone's life.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/explore" className="btn btn-primary btn-lg">
              Explore More Campaigns
            </Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg">
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
