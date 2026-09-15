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
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
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
  const {
    currentCampaign: campaign,
    loading,
    fetchCampaignBySlug,
    updateCampaignProgress,
  } = useCampaignStore();
  const [showDonate, setShowDonate] = useState(false);
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(false);
  useEffect(() => {
    fetchCampaignBySlug(id);
  }, [id, fetchCampaignBySlug]);
  useEffect(() => {
    if (!campaign?._id) return;
    setDonationsLoading(true);
    api
      .get(`/donations/campaign/${campaign._id}?limit=10`)
      .then((res) => setDonations(res.data.data || []))
      .catch(() => {})
      .finally(() => setDonationsLoading(false));
  }, [campaign?._id]);
  useSocket(campaign?._id, (data) => {
    updateCampaignProgress(campaign._id, data);
  });
  if (loading || !campaign) {
    return _jsxDEV(
      'div',
      {
        className: 'page-content',
        children: _jsxDEV(
          'div',
          {
            className: 'container',
            children: _jsxDEV(
              LoadingSpinner,
              {
                text: 'Loading campaign...',
              },
              void 0,
              false
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
        await navigator.share({
          title: campaign.title,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: [
        _jsxDEV(
          'div',
          {
            className: 'container',
            children: _jsxDEV(
              motion.div,
              {
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
                transition: {
                  duration: 0.4,
                },
                children: _jsxDEV(
                  'div',
                  {
                    className: 'campaign-detail',
                    children: [
                      _jsxDEV(
                        'div',
                        {
                          children: [
                            _jsxDEV(
                              'div',
                              {
                                className: 'campaign-cover',
                                children: _jsxDEV(
                                  'img',
                                  {
                                    src: campaign.coverImage,
                                    alt: campaign.title,
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
                                style: {
                                  marginTop: 'var(--space-6)',
                                },
                                children: [
                                  _jsxDEV(
                                    'span',
                                    {
                                      className: `badge ${categoryColors[campaign.category] || 'badge-neutral'}`,
                                      children: campaign.category,
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'h1',
                                    {
                                      style: {
                                        marginTop: 'var(--space-3)',
                                        fontSize: 'var(--text-3xl)',
                                      },
                                      children: campaign.title,
                                    },
                                    void 0,
                                    false
                                  ),
                                ],
                              },
                              void 0,
                              true
                            ),
                            _jsxDEV(
                              'div',
                              {
                                className: 'flex items-center gap-3',
                                style: {
                                  marginTop: 'var(--space-4)',
                                },
                                children: [
                                  _jsxDEV(
                                    'div',
                                    {
                                      className: 'avatar',
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
                                    'div',
                                    {
                                      children: [
                                        _jsxDEV(
                                          'p',
                                          {
                                            className: 'font-medium',
                                            style: {
                                              fontSize: 'var(--text-sm)',
                                            },
                                            children: campaign.beneficiary?.name,
                                          },
                                          void 0,
                                          false
                                        ),
                                        _jsxDEV(
                                          'p',
                                          {
                                            className: 'text-xs text-muted',
                                            children: 'Campaign organizer',
                                          },
                                          void 0,
                                          false
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
                            _jsxDEV(
                              'div',
                              {
                                className: 'campaign-story',
                                children: [
                                  _jsxDEV(
                                    'h3',
                                    {
                                      style: {
                                        marginBottom: 'var(--space-4)',
                                        fontSize: 'var(--text-xl)',
                                      },
                                      children: 'About this campaign',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'p',
                                    {
                                      children: campaign.story,
                                    },
                                    void 0,
                                    false
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
                                  marginTop: 'var(--space-8)',
                                },
                                children: [
                                  _jsxDEV(
                                    'h4',
                                    {
                                      style: {
                                        fontSize: 'var(--text-base)',
                                        marginBottom: 'var(--space-2)',
                                      },
                                      children: 'Share this campaign',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'div',
                                    {
                                      className: 'share-buttons',
                                      children: _jsxDEV(
                                        'button',
                                        {
                                          className: 'share-btn',
                                          onClick: handleShare,
                                          children: [
                                            _jsxDEV(
                                              'svg',
                                              {
                                                width: '16',
                                                height: '16',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                strokeWidth: '2',
                                                children: [
                                                  _jsxDEV(
                                                    'path',
                                                    {
                                                      d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
                                                    },
                                                    void 0,
                                                    false
                                                  ),
                                                  _jsxDEV(
                                                    'path',
                                                    {
                                                      d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
                                                    },
                                                    void 0,
                                                    false
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true
                                            ),
                                            'Copy Link',
                                          ],
                                        },
                                        void 0,
                                        true
                                      ),
                                    },
                                    void 0,
                                    false
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
                                  marginTop: 'var(--space-10)',
                                },
                                children: [
                                  _jsxDEV(
                                    'h3',
                                    {
                                      style: {
                                        fontSize: 'var(--text-xl)',
                                        marginBottom: 'var(--space-4)',
                                      },
                                      children: [
                                        'Recent Donations (',
                                        campaign.backersCount || 0,
                                        ')',
                                      ],
                                    },
                                    void 0,
                                    true
                                  ),
                                  donationsLoading
                                    ? _jsxDEV(
                                        LoadingSpinner,
                                        {
                                          size: 'sm',
                                        },
                                        void 0,
                                        false
                                      )
                                    : donations.length > 0
                                      ? _jsxDEV(
                                          'div',
                                          {
                                            children: donations.map((donation) =>
                                              _jsxDEV(
                                                'div',
                                                {
                                                  className: 'donation-item',
                                                  children: [
                                                    _jsxDEV(
                                                      'div',
                                                      {
                                                        className: 'avatar avatar-sm',
                                                        children: donation.isAnonymous
                                                          ? '?'
                                                          : getInitial(
                                                              donation.donor?.name ||
                                                                donation.guestName
                                                            ),
                                                      },
                                                      void 0,
                                                      false
                                                    ),
                                                    _jsxDEV(
                                                      'div',
                                                      {
                                                        style: {
                                                          flex: 1,
                                                        },
                                                        children: [
                                                          _jsxDEV(
                                                            'p',
                                                            {
                                                              className: 'font-medium text-sm',
                                                              children: donation.isAnonymous
                                                                ? 'Anonymous'
                                                                : donation.donor?.name ||
                                                                  donation.guestName ||
                                                                  'Supporter',
                                                            },
                                                            void 0,
                                                            false
                                                          ),
                                                          donation.message &&
                                                            _jsxDEV(
                                                              'p',
                                                              {
                                                                className: 'text-xs text-muted',
                                                                children: donation.message,
                                                              },
                                                              void 0,
                                                              false
                                                            ),
                                                        ],
                                                      },
                                                      void 0,
                                                      true
                                                    ),
                                                    _jsxDEV(
                                                      'span',
                                                      {
                                                        className: 'donation-amount',
                                                        children: [
                                                          '$',
                                                          (donation.amountCents / 100).toFixed(0),
                                                        ],
                                                      },
                                                      void 0,
                                                      true
                                                    ),
                                                  ],
                                                },
                                                donation._id,
                                                true
                                              )
                                            ),
                                          },
                                          void 0,
                                          false
                                        )
                                      : _jsxDEV(
                                          'p',
                                          {
                                            className: 'text-muted text-sm',
                                            children: 'No donations yet. Be the first!',
                                          },
                                          void 0,
                                          false
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
                      _jsxDEV(
                        'div',
                        {
                          className: 'campaign-sidebar',
                          children: _jsxDEV(
                            'div',
                            {
                              className: 'campaign-funding-card',
                              children: [
                                _jsxDEV(
                                  'div',
                                  {
                                    children: [
                                      _jsxDEV(
                                        'span',
                                        {
                                          className: 'campaign-amount',
                                          children: ['$', raised.toLocaleString()],
                                        },
                                        void 0,
                                        true
                                      ),
                                      _jsxDEV(
                                        'span',
                                        {
                                          className: 'campaign-goal',
                                          children: [
                                            ' raised of $',
                                            goal.toLocaleString(),
                                            ' goal',
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
                                _jsxDEV(
                                  'div',
                                  {
                                    style: {
                                      margin: 'var(--space-4) 0',
                                    },
                                    children: [
                                      _jsxDEV(
                                        ProgressBar,
                                        {
                                          current: campaign.amountRaisedCents,
                                          goal: campaign.goalAmountCents,
                                          large: true,
                                        },
                                        void 0,
                                        false
                                      ),
                                      _jsxDEV(
                                        'p',
                                        {
                                          className: 'text-sm font-medium',
                                          style: {
                                            marginTop: 'var(--space-2)',
                                            color: 'var(--color-secondary)',
                                          },
                                          children: [percentage.toFixed(0), '% funded'],
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
                                    className: 'campaign-meta',
                                    children: [
                                      _jsxDEV(
                                        'div',
                                        {
                                          className: 'campaign-meta-item',
                                          children: [
                                            _jsxDEV(
                                              'div',
                                              {
                                                className: 'campaign-meta-value',
                                                children: campaign.backersCount || 0,
                                              },
                                              void 0,
                                              false
                                            ),
                                            _jsxDEV(
                                              'div',
                                              {
                                                className: 'campaign-meta-label',
                                                children: 'Backers',
                                              },
                                              void 0,
                                              false
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true
                                      ),
                                      _jsxDEV(
                                        'div',
                                        {
                                          className: 'campaign-meta-item',
                                          children: [
                                            _jsxDEV(
                                              'div',
                                              {
                                                className: 'campaign-meta-value',
                                                children: daysLeft,
                                              },
                                              void 0,
                                              false
                                            ),
                                            _jsxDEV(
                                              'div',
                                              {
                                                className: 'campaign-meta-label',
                                                children: 'Days Left',
                                              },
                                              void 0,
                                              false
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
                                campaign.status === 'active' && daysLeft > 0
                                  ? _jsxDEV(
                                      'button',
                                      {
                                        className: 'btn btn-secondary btn-lg btn-full',
                                        style: {
                                          marginTop: 'var(--space-5)',
                                        },
                                        onClick: () => setShowDonate(true),
                                        id: 'donate-button',
                                        children: [
                                          _jsxDEV(
                                            'svg',
                                            {
                                              width: '20',
                                              height: '20',
                                              viewBox: '0 0 24 24',
                                              fill: 'none',
                                              stroke: 'currentColor',
                                              strokeWidth: '2',
                                              children: _jsxDEV(
                                                'path',
                                                {
                                                  d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
                                                },
                                                void 0,
                                                false
                                              ),
                                            },
                                            void 0,
                                            false
                                          ),
                                          'Donate Now',
                                        ],
                                      },
                                      void 0,
                                      true
                                    )
                                  : _jsxDEV(
                                      'div',
                                      {
                                        className: 'badge badge-neutral',
                                        style: {
                                          marginTop: 'var(--space-5)',
                                          padding: 'var(--space-3) var(--space-4)',
                                          fontSize: 'var(--text-sm)',
                                          width: '100%',
                                          justifyContent: 'center',
                                        },
                                        children:
                                          campaign.status === 'funded'
                                            ? '🎉 Fully Funded!'
                                            : 'Campaign has ended',
                                      },
                                      void 0,
                                      false
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
        ),
        showDonate &&
          _jsxDEV(
            DonateModal,
            {
              campaign: campaign,
              onClose: () => setShowDonate(false),
            },
            void 0,
            false
          ),
      ],
    },
    void 0,
    true
  );
}
