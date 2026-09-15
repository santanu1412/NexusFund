import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useCampaignStore } from '../store/campaignStore';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import api from '../lib/api';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
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
        const campRes = await api.get('/campaigns/my');
        setMyCampaigns(campRes.data.data || []);
      } catch {
        setMyCampaigns([]);
      }
      try {
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
                text: 'Loading dashboard...',
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
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: _jsxDEV(
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
                duration: 0.3,
              },
              children: [
                _jsxDEV(
                  'div',
                  {
                    className: 'flex justify-between items-center',
                    style: {
                      marginBottom: 'var(--space-8)',
                    },
                    children: [
                      _jsxDEV(
                        'div',
                        {
                          children: [
                            _jsxDEV(
                              'h1',
                              {
                                children: 'Dashboard',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'p',
                              {
                                className: 'text-secondary',
                                style: {
                                  marginTop: 'var(--space-1)',
                                },
                                children: ['Welcome back, ', user?.name],
                              },
                              void 0,
                              true
                            ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      user?.role === 'beneficiary' &&
                        _jsxDEV(
                          Link,
                          {
                            to: '/create',
                            className: 'btn btn-primary',
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
                                      'line',
                                      {
                                        x1: '12',
                                        y1: '5',
                                        x2: '12',
                                        y2: '19',
                                      },
                                      void 0,
                                      false
                                    ),
                                    _jsxDEV(
                                      'line',
                                      {
                                        x1: '5',
                                        y1: '12',
                                        x2: '19',
                                        y2: '12',
                                      },
                                      void 0,
                                      false
                                    ),
                                  ],
                                },
                                void 0,
                                true
                              ),
                              'New Campaign',
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
                    className: 'dashboard-stats',
                    children: [
                      _jsxDEV(
                        'div',
                        {
                          className: 'dashboard-stat-card',
                          children: [
                            _jsxDEV(
                              'div',
                              {
                                className: 'stat-label',
                                children: 'My Campaigns',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'div',
                              {
                                className: 'stat-value',
                                children: myCampaigns.length,
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
                          className: 'dashboard-stat-card',
                          children: [
                            _jsxDEV(
                              'div',
                              {
                                className: 'stat-label',
                                children: 'Total Raised',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'div',
                              {
                                className: 'stat-value',
                                style: {
                                  color: 'var(--color-secondary)',
                                },
                                children: ['$', totalRaised.toLocaleString()],
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
                          className: 'dashboard-stat-card',
                          children: [
                            _jsxDEV(
                              'div',
                              {
                                className: 'stat-label',
                                children: 'Total Donated',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'div',
                              {
                                className: 'stat-value',
                                children: ['$', totalDonated.toLocaleString()],
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
                _jsxDEV(
                  'div',
                  {
                    className: 'tabs',
                    children: [
                      _jsxDEV(
                        'button',
                        {
                          className: `tab ${activeTab === 'campaigns' ? 'tab-active' : ''}`,
                          onClick: () => setActiveTab('campaigns'),
                          children: ['My Campaigns (', myCampaigns.length, ')'],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'button',
                        {
                          className: `tab ${activeTab === 'donations' ? 'tab-active' : ''}`,
                          onClick: () => setActiveTab('donations'),
                          children: ['My Donations (', myDonations.length, ')'],
                        },
                        void 0,
                        true
                      ),
                    ],
                  },
                  void 0,
                  true
                ),
                activeTab === 'campaigns' &&
                  _jsxDEV(
                    'div',
                    {
                      className: 'flex flex-col gap-4',
                      children:
                        myCampaigns.length > 0
                          ? myCampaigns.map((campaign) => {
                              const raised = campaign.amountRaisedCents / 100;
                              const goal = campaign.goalAmountCents / 100;
                              return _jsxDEV(
                                Link,
                                {
                                  to: `/campaigns/${campaign.slug || campaign._id}`,
                                  children: _jsxDEV(
                                    'div',
                                    {
                                      className: 'campaign-list-item',
                                      children: [
                                        _jsxDEV(
                                          'div',
                                          {
                                            className: 'campaign-list-thumb',
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
                                              flex: 1,
                                              display: 'flex',
                                              flexDirection: 'column',
                                              gap: 'var(--space-2)',
                                            },
                                            children: [
                                              _jsxDEV(
                                                'div',
                                                {
                                                  className: 'flex items-center gap-2',
                                                  children: [
                                                    _jsxDEV(
                                                      'span',
                                                      {
                                                        className: `badge ${statusBadge[campaign.status] || 'badge-neutral'}`,
                                                        children:
                                                          statusLabel[campaign.status] ||
                                                          campaign.status,
                                                      },
                                                      void 0,
                                                      false
                                                    ),
                                                    _jsxDEV(
                                                      'span',
                                                      {
                                                        className: 'text-xs text-muted',
                                                        children: campaign.category,
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
                                                'h4',
                                                {
                                                  className: 'font-semibold',
                                                  style: {
                                                    fontSize: 'var(--text-base)',
                                                  },
                                                  children: campaign.title,
                                                },
                                                void 0,
                                                false
                                              ),
                                              _jsxDEV(
                                                ProgressBar,
                                                {
                                                  current: campaign.amountRaisedCents,
                                                  goal: campaign.goalAmountCents,
                                                },
                                                void 0,
                                                false
                                              ),
                                              _jsxDEV(
                                                'div',
                                                {
                                                  className:
                                                    'flex justify-between text-xs text-muted',
                                                  children: [
                                                    _jsxDEV(
                                                      'span',
                                                      {
                                                        children: [
                                                          '$',
                                                          raised.toLocaleString(),
                                                          ' of $',
                                                          goal.toLocaleString(),
                                                        ],
                                                      },
                                                      void 0,
                                                      true
                                                    ),
                                                    _jsxDEV(
                                                      'span',
                                                      {
                                                        children: [
                                                          campaign.backersCount || 0,
                                                          ' backers',
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
                                      ],
                                    },
                                    void 0,
                                    true
                                  ),
                                },
                                campaign._id,
                                false
                              );
                            })
                          : _jsxDEV(
                              EmptyState,
                              {
                                title: 'No campaigns yet',
                                description:
                                  user?.role === 'beneficiary'
                                    ? "You haven't created any campaigns yet. Start your first one!"
                                    : 'Switch to a beneficiary account to create campaigns.',
                                action:
                                  user?.role === 'beneficiary' &&
                                  _jsxDEV(
                                    Link,
                                    {
                                      to: '/create',
                                      className: 'btn btn-primary',
                                      children: 'Create a Campaign',
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
                  ),
                activeTab === 'donations' &&
                  _jsxDEV(
                    'div',
                    {
                      className: 'flex flex-col gap-4',
                      children:
                        myDonations.length > 0
                          ? myDonations.map((donation) =>
                              _jsxDEV(
                                'div',
                                {
                                  className: 'campaign-list-item',
                                  children: [
                                    _jsxDEV(
                                      'div',
                                      {
                                        className: 'campaign-list-thumb',
                                        children:
                                          donation.campaign?.coverImage &&
                                          _jsxDEV(
                                            'img',
                                            {
                                              src: donation.campaign.coverImage,
                                              alt: '',
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
                                          flex: 1,
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: 'var(--space-2)',
                                        },
                                        children: [
                                          _jsxDEV(
                                            'h4',
                                            {
                                              className: 'font-semibold',
                                              style: {
                                                fontSize: 'var(--text-base)',
                                              },
                                              children: donation.campaign?.title || 'Campaign',
                                            },
                                            void 0,
                                            false
                                          ),
                                          _jsxDEV(
                                            'p',
                                            {
                                              className: 'text-sm text-muted',
                                              children: [
                                                'Donated on ',
                                                new Date(donation.createdAt).toLocaleDateString(),
                                              ],
                                            },
                                            void 0,
                                            true
                                          ),
                                          donation.message &&
                                            _jsxDEV(
                                              'p',
                                              {
                                                className: 'text-sm text-secondary',
                                                children: ['"', donation.message, '"'],
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
                                        className: 'font-bold',
                                        style: {
                                          color: 'var(--color-secondary)',
                                          fontSize: 'var(--text-lg)',
                                        },
                                        children: ['$', (donation.amountCents / 100).toFixed(0)],
                                      },
                                      void 0,
                                      true
                                    ),
                                  ],
                                },
                                donation._id,
                                true
                              )
                            )
                          : _jsxDEV(
                              EmptyState,
                              {
                                title: 'No donations yet',
                                description:
                                  "You haven't backed any campaigns yet. Explore campaigns and support causes you care about.",
                                action: _jsxDEV(
                                  Link,
                                  {
                                    to: '/explore',
                                    className: 'btn btn-primary',
                                    children: 'Explore Campaigns',
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
