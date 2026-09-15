import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProgressBar from '../ui/ProgressBar';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
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
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');
  return _jsxDEV(
    motion.div,
    {
      initial: {
        opacity: 0,
        y: 20,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      transition: {
        duration: 0.4,
        delay: index * 0.05,
      },
      children: _jsxDEV(
        Link,
        {
          to: `/campaigns/${campaign.slug || campaign._id}`,
          style: {
            display: 'block',
          },
          children: _jsxDEV(
            'div',
            {
              className: 'card',
              id: `campaign-card-${campaign._id}`,
              children: [
                _jsxDEV(
                  'div',
                  {
                    style: {
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      backgroundColor: '#E5E7EB',
                    },
                    children: _jsxDEV(
                      'img',
                      {
                        src: campaign.coverImage,
                        alt: campaign.title,
                        style: {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        },
                        onError: (e) => {
                          e.target.style.display = 'none';
                        },
                        loading: 'lazy',
                      },
                      void 0,
                      false
                    ),
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'div',
                  {
                    className: 'card-body',
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                    },
                    children: [
                      _jsxDEV(
                        'div',
                        {
                          children: _jsxDEV(
                            'span',
                            {
                              className: `badge ${categoryColors[campaign.category] || 'badge-neutral'}`,
                              children: campaign.category,
                            },
                            void 0,
                            false
                          ),
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'h3',
                        {
                          className: 'line-clamp-2',
                          style: {
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-semibold)',
                          },
                          children: campaign.title,
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'div',
                        {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsxDEV(
                              'div',
                              {
                                className: 'avatar avatar-sm',
                                style: {
                                  width: '24px',
                                  height: '24px',
                                  fontSize: '0.65rem',
                                },
                                children:
                                  campaign.beneficiary?.avatar &&
                                  campaign.beneficiary.avatar !== '/default-avatar.png'
                                    ? _jsxDEV(
                                        'img',
                                        {
                                          src: campaign.beneficiary.avatar,
                                          alt: '',
                                          style: {
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                          },
                                        },
                                        void 0,
                                        false
                                      )
                                    : getInitial(campaign.beneficiary?.name),
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'span',
                              {
                                className: 'text-sm text-secondary',
                                children: ['by ', campaign.beneficiary?.name || 'Unknown'],
                              },
                              void 0,
                              true
                            ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'div',
                        {
                          style: {
                            marginTop: 'var(--space-1)',
                          },
                          children: _jsxDEV(
                            ProgressBar,
                            {
                              current: campaign.amountRaisedCents,
                              goal: campaign.goalAmountCents,
                            },
                            void 0,
                            false
                          ),
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'div',
                        {
                          className: 'flex justify-between items-center',
                          children: _jsxDEV(
                            'div',
                            {
                              children: [
                                _jsxDEV(
                                  'span',
                                  {
                                    className: 'font-semibold',
                                    style: {
                                      color: 'var(--color-secondary)',
                                    },
                                    children: ['$', raised.toLocaleString()],
                                  },
                                  void 0,
                                  true
                                ),
                                _jsxDEV(
                                  'span',
                                  {
                                    className: 'text-sm text-muted',
                                    children: [' raised of $', goal.toLocaleString()],
                                  },
                                  void 0,
                                  true
                                ),
                              ],
                            },
                            void 0,
                            true
                          ),
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'div',
                        {
                          className: 'flex justify-between',
                          style: {
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-muted)',
                          },
                          children: [
                            _jsxDEV(
                              'span',
                              {
                                children: [campaign.backersCount || 0, ' backers'],
                              },
                              void 0,
                              true
                            ),
                            _jsxDEV(
                              'span',
                              {
                                children: [daysLeft, ' days left'],
                              },
                              void 0,
                              true
                            ),
                          ],
                        },
                        void 0,
                        true
                      ),
                    ],
                  },
                  void 0,
                  true
                ),
              ],
            },
            void 0,
            true
          ),
        },
        void 0,
        false
      ),
    },
    void 0,
    false
  );
}
