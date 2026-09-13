import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useCampaignStore } from '../store/campaignStore';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import api from '../lib/api';

const statusBadge = {
  pending_review: 'badge-warning',
  active: 'badge-success',
  funded: 'badge-primary',
  rejected: 'badge-danger',
  closed: 'badge-neutral',
};

const statusLabel = {
  pending_review: 'Under Review',
  active: 'Active',
  funded: 'Funded',
  rejected: 'Rejected',
  closed: 'Closed',
};

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user's campaigns
        const campRes = await api.get('/campaigns/my');
        setMyCampaigns(campRes.data.data || []);
      } catch {
        // If endpoint doesn't exist yet, that's OK
        setMyCampaigns([]);
      }

      try {
        // Fetch user's donations
        const donRes = await api.get('/users/me/donations');
        setMyDonations(donRes.data.data || []);
      } catch {
        setMyDonations([]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const totalRaised = myCampaigns.reduce((sum, c) => sum + (c.amountRaisedCents || 0), 0) / 100;
  const totalDonated = myDonations.reduce((sum, d) => sum + (d.amountCents || 0), 0) / 100;

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <LoadingSpinner text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-8)' }}>
            <div>
              <h1>Dashboard</h1>
              <p className="text-secondary" style={{ marginTop: 'var(--space-1)' }}>Welcome back, {user?.name}</p>
            </div>
            {user?.role === 'beneficiary' && (
              <Link to="/create" className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                New Campaign
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <div className="stat-label">My Campaigns</div>
              <div className="stat-value">{myCampaigns.length}</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="stat-label">Total Raised</div>
              <div className="stat-value" style={{ color: 'var(--color-secondary)' }}>${totalRaised.toLocaleString()}</div>
            </div>
            <div className="dashboard-stat-card">
              <div className="stat-label">Total Donated</div>
              <div className="stat-value">${totalDonated.toLocaleString()}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab ${activeTab === 'campaigns' ? 'tab-active' : ''}`} onClick={() => setActiveTab('campaigns')}>
              My Campaigns ({myCampaigns.length})
            </button>
            <button className={`tab ${activeTab === 'donations' ? 'tab-active' : ''}`} onClick={() => setActiveTab('donations')}>
              My Donations ({myDonations.length})
            </button>
          </div>

          {/* Campaign List */}
          {activeTab === 'campaigns' && (
            <div className="flex flex-col gap-4">
              {myCampaigns.length > 0 ? (
                myCampaigns.map((campaign) => {
                  const raised = campaign.amountRaisedCents / 100;
                  const goal = campaign.goalAmountCents / 100;
                  return (
                    <Link to={`/campaigns/${campaign.slug || campaign._id}`} key={campaign._id}>
                      <div className="campaign-list-item">
                        <div className="campaign-list-thumb">
                          <img src={campaign.coverImage} alt={campaign.title} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                          <div className="flex items-center gap-2">
                            <span className={`badge ${statusBadge[campaign.status] || 'badge-neutral'}`}>
                              {statusLabel[campaign.status] || campaign.status}
                            </span>
                            <span className="text-xs text-muted">{campaign.category}</span>
                          </div>
                          <h4 className="font-semibold" style={{ fontSize: 'var(--text-base)' }}>{campaign.title}</h4>
                          <ProgressBar current={campaign.amountRaisedCents} goal={campaign.goalAmountCents} />
                          <div className="flex justify-between text-xs text-muted">
                            <span>${raised.toLocaleString()} of ${goal.toLocaleString()}</span>
                            <span>{campaign.backersCount || 0} backers</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <EmptyState
                  title="No campaigns yet"
                  description={user?.role === 'beneficiary'
                    ? "You haven't created any campaigns yet. Start your first one!"
                    : "Switch to a beneficiary account to create campaigns."}
                  action={user?.role === 'beneficiary' && (
                    <Link to="/create" className="btn btn-primary">Create a Campaign</Link>
                  )}
                />
              )}
            </div>
          )}

          {/* Donations List */}
          {activeTab === 'donations' && (
            <div className="flex flex-col gap-4">
              {myDonations.length > 0 ? (
                myDonations.map((donation) => (
                  <div key={donation._id} className="campaign-list-item">
                    <div className="campaign-list-thumb">
                      {donation.campaign?.coverImage && (
                        <img src={donation.campaign.coverImage} alt="" />
                      )}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <h4 className="font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                        {donation.campaign?.title || 'Campaign'}
                      </h4>
                      <p className="text-sm text-muted">
                        Donated on {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                      {donation.message && <p className="text-sm text-secondary">"{donation.message}"</p>}
                    </div>
                    <div className="font-bold" style={{ color: 'var(--color-secondary)', fontSize: 'var(--text-lg)' }}>
                      ${(donation.amountCents / 100).toFixed(0)}
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No donations yet"
                  description="You haven't backed any campaigns yet. Explore campaigns and support causes you care about."
                  action={
                    <Link to="/explore" className="btn btn-primary">Explore Campaigns</Link>
                  }
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
