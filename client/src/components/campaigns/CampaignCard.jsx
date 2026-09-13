import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProgressBar from '../ui/ProgressBar';

const categoryColors = {
  Medical: 'badge-danger',
  Emergency: 'badge-warning',
  Education: 'badge-primary',
  Community: 'badge-success',
  Memorial: 'badge-neutral',
  Other: 'badge-neutral',
};

export default function CampaignCard({ campaign, index = 0 }) {
  const raised = campaign.amountRaisedCents / 100;
  const goal = campaign.goalAmountCents / 100;
  const percentage = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  const daysLeft = (() => {
    const now = new Date();
    const deadline = new Date(campaign.deadline);
    const diff = deadline - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/campaigns/${campaign.slug || campaign._id}`} style={{ display: 'block' }}>
        <div className="card" id={`campaign-card-${campaign._id}`}>
          {/* Cover Image */}
          <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#E5E7EB' }}>
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
              onError={(e) => { e.target.style.display = 'none'; }}
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {/* Category Badge */}
            <div>
              <span className={`badge ${categoryColors[campaign.category] || 'badge-neutral'}`}>
                {campaign.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="line-clamp-2" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)' }}>
              {campaign.title}
            </h3>

            {/* Creator */}
            <div className="flex items-center gap-2">
              <div className="avatar avatar-sm" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>
                {campaign.beneficiary?.avatar && campaign.beneficiary.avatar !== '/default-avatar.png' ? (
                  <img src={campaign.beneficiary.avatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  getInitial(campaign.beneficiary?.name)
                )}
              </div>
              <span className="text-sm text-secondary">
                by {campaign.beneficiary?.name || 'Unknown'}
              </span>
            </div>

            {/* Progress */}
            <div style={{ marginTop: 'var(--space-1)' }}>
              <ProgressBar current={campaign.amountRaisedCents} goal={campaign.goalAmountCents} />
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold" style={{ color: 'var(--color-secondary)' }}>
                  ${raised.toLocaleString()}
                </span>
                <span className="text-sm text-muted"> raised of ${goal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              <span>{campaign.backersCount || 0} backers</span>
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
