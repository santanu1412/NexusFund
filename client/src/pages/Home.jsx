import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';
import CampaignCard from '../components/campaigns/CampaignCard';
import SkeletonCard from '../components/ui/SkeletonCard';

export default function Home() {
  const { campaigns, loading, fetchCampaigns } = useCampaignStore();

  useEffect(() => {
    fetchCampaigns({ limit: 6, sort: 'newest' });
  }, [fetchCampaigns]);

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Fund What Matters</h1>
            <p>
              NexusFund makes it easy to raise money for the things you care about.
              Whether it's a medical emergency, education, or community project — every contribution counts.
            </p>
            <div className="hero-actions">
              <Link to="/create" className="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                Start a Campaign
              </Link>
              <Link to="/explore" className="btn btn-outline btn-lg">
                Explore Campaigns
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-white)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-center" style={{ marginBottom: 'var(--space-4)' }}>How It Works</h2>
            <p className="text-center text-secondary" style={{ marginBottom: 'var(--space-12)', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
              Getting started is simple. Create your campaign in minutes.
            </p>

            <div className="steps-grid">
              {[
                { num: '1', title: 'Create Your Campaign', desc: 'Tell your story, set a funding goal, and add photos. It takes less than 5 minutes.' },
                { num: '2', title: 'Share With Everyone', desc: 'Share your campaign link with friends, family, and your community on social media.' },
                { num: '3', title: 'Receive Donations', desc: 'Watch your funding grow in real-time. Withdraw funds directly to your bank account.' },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  className="step-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="step-number">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-8)' }}>
            <div>
              <h2>Featured Campaigns</h2>
              <p className="text-secondary" style={{ marginTop: 'var(--space-2)' }}>Support campaigns that are making a difference</p>
            </div>
            <Link to="/explore" className="btn btn-outline">
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6" /></svg>
            </Link>
          </div>

          <div className="grid grid-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : campaigns.slice(0, 6).map((campaign, i) => (
                  <CampaignCard key={campaign._id} campaign={campaign} index={i} />
                ))
            }
          </div>

          {!loading && campaigns.length === 0 && (
            <div className="text-center" style={{ padding: 'var(--space-12) 0' }}>
              <p className="text-muted">No campaigns yet. Be the first to create one!</p>
              <Link to="/create" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Start a Campaign</Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: 'var(--space-4) 0' }}>
        <div className="container">
          <div className="stats-bar">
            {[
              { value: '$2.5M+', label: 'Total Raised' },
              { value: '1,200+', label: 'Campaigns Created' },
              { value: '15K+', label: 'Generous Backers' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to Make a Difference?</h2>
            <p>Start your fundraising campaign today and let the world rally behind your cause.</p>
            <Link to="/create" className="btn btn-lg" style={{ backgroundColor: '#fff', color: 'var(--color-primary)', fontWeight: 'var(--font-bold)' }}>
              Start Your Campaign — It's Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
