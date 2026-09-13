import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import DonateModal from '../components/campaigns/DonateModal';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useSocket } from '../hooks/useSocket';

const categoryColors = {
  Medical: 'badge-danger',
  Emergency: 'badge-warning',
  Education: 'badge-primary',
  Community: 'badge-success',
  Memorial: 'badge-neutral',
  Other: 'badge-neutral',
};

export default function CampaignDetail() {
  const { id } = useParams();
  const { currentCampaign: campaign, loading, fetchCampaignBySlug, updateCampaignProgress } = useCampaignStore();
  const [showDonate, setShowDonate] = useState(false);
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(false);

  useEffect(() => {
    fetchCampaignBySlug(id);
  }, [id, fetchCampaignBySlug]);

  // Fetch donations
  useEffect(() => {
    if (!campaign?._id) return;
    setDonationsLoading(true);
    api.get(`/donations/campaign/${campaign._id}?limit=10`)
      .then(res => setDonations(res.data.data || []))
      .catch(() => {})
      .finally(() => setDonationsLoading(false));
  }, [campaign?._id]);

  // Real-time updates via Socket.IO
  useSocket(campaign?._id, (data) => {
    updateCampaignProgress(campaign._id, data);
  });

  if (loading || !campaign) {
    return (
      <div className="page-content">
        <div className="container">
          <LoadingSpinner text="Loading campaign..." />
        </div>
      </div>
    );
  }

  const raised = campaign.amountRaisedCents / 100;
  const goal = campaign.goalAmountCents / 100;
  const percentage = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
  const daysLeft = (() => {
    const diff = new Date(campaign.deadline) - new Date();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: campaign.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="page-content">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="campaign-detail">
            {/* Main Content */}
            <div>
              {/* Cover Image */}
              <div className="campaign-cover">
                <img src={campaign.coverImage} alt={campaign.title} />
              </div>

              {/* Title */}
              <div style={{ marginTop: 'var(--space-6)' }}>
                <span className={`badge ${categoryColors[campaign.category] || 'badge-neutral'}`}>
                  {campaign.category}
                </span>
                <h1 style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-3xl)' }}>{campaign.title}</h1>
              </div>

              {/* Creator */}
              <div className="flex items-center gap-3" style={{ marginTop: 'var(--space-4)' }}>
                <div className="avatar">
                  {campaign.beneficiary?.avatar && campaign.beneficiary.avatar !== '/default-avatar.png' ? (
                    <img src={campaign.beneficiary.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    getInitial(campaign.beneficiary?.name)
                  )}
                </div>
                <div>
                  <p className="font-medium" style={{ fontSize: 'var(--text-sm)' }}>{campaign.beneficiary?.name}</p>
                  <p className="text-xs text-muted">Campaign organizer</p>
                </div>
              </div>

              {/* Story */}
              <div className="campaign-story">
                <h3 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-xl)' }}>About this campaign</h3>
                <p>{campaign.story}</p>
              </div>

              {/* Share */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Share this campaign</h4>
                <div className="share-buttons">
                  <button className="share-btn" onClick={handleShare}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Recent Donations */}
              <div style={{ marginTop: 'var(--space-10)' }}>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
                  Recent Donations ({campaign.backersCount || 0})
                </h3>
                {donationsLoading ? (
                  <LoadingSpinner size="sm" />
                ) : donations.length > 0 ? (
                  <div>
                    {donations.map((donation) => (
                      <div key={donation._id} className="donation-item">
                        <div className="avatar avatar-sm">
                          {donation.isAnonymous ? '?' : getInitial(donation.donor?.name || donation.guestName)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p className="font-medium text-sm">
                            {donation.isAnonymous ? 'Anonymous' : (donation.donor?.name || donation.guestName || 'Supporter')}
                          </p>
                          {donation.message && <p className="text-xs text-muted">{donation.message}</p>}
                        </div>
                        <span className="donation-amount">${(donation.amountCents / 100).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm">No donations yet. Be the first!</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="campaign-sidebar">
              <div className="campaign-funding-card">
                {/* Amount */}
                <div>
                  <span className="campaign-amount">${raised.toLocaleString()}</span>
                  <span className="campaign-goal"> raised of ${goal.toLocaleString()} goal</span>
                </div>

                {/* Progress Bar */}
                <div style={{ margin: 'var(--space-4) 0' }}>
                  <ProgressBar current={campaign.amountRaisedCents} goal={campaign.goalAmountCents} large />
                  <p className="text-sm font-medium" style={{ marginTop: 'var(--space-2)', color: 'var(--color-secondary)' }}>
                    {percentage.toFixed(0)}% funded
                  </p>
                </div>

                {/* Meta Stats */}
                <div className="campaign-meta">
                  <div className="campaign-meta-item">
                    <div className="campaign-meta-value">{campaign.backersCount || 0}</div>
                    <div className="campaign-meta-label">Backers</div>
                  </div>
                  <div className="campaign-meta-item">
                    <div className="campaign-meta-value">{daysLeft}</div>
                    <div className="campaign-meta-label">Days Left</div>
                  </div>
                </div>

                {/* Donate Button */}
                {campaign.status === 'active' && daysLeft > 0 ? (
                  <button
                    className="btn btn-secondary btn-lg btn-full"
                    style={{ marginTop: 'var(--space-5)' }}
                    onClick={() => setShowDonate(true)}
                    id="donate-button"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    Donate Now
                  </button>
                ) : (
                  <div className="badge badge-neutral" style={{ marginTop: 'var(--space-5)', padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-sm)', width: '100%', justifyContent: 'center' }}>
                    {campaign.status === 'funded' ? '🎉 Fully Funded!' : 'Campaign has ended'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Donate Modal */}
      {showDonate && (
        <DonateModal campaign={campaign} onClose={() => setShowDonate(false)} />
      )}
    </div>
  );
}
