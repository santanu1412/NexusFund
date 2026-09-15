import { useEffect, useState, useCallback } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import CampaignCard from '../components/campaigns/CampaignCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import { Link } from 'react-router-dom';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from 'react/jsx-dev-runtime';
const categories = ['All', 'Medical', 'Emergency', 'Education', 'Community', 'Memorial', 'Other'];
const sortOptions = [
  {
    value: 'newest',
    label: 'Newest',
  },
  {
    value: 'popular',
    label: 'Most Popular',
  },
  {
    value: 'ending',
    label: 'Ending Soon',
  },
  {
    value: 'funded',
    label: 'Most Funded',
  },
];
export default function Explore() {
  const { campaigns, loading, pagination, fetchCampaigns } = useCampaignStore();
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const loadCampaigns = useCallback(() => {
    const params = {
      page,
      limit: 12,
      sort,
    };
    if (category !== 'All') params.category = category;
    if (search) params.search = search;
    fetchCampaigns(params);
  }, [page, sort, category, search, fetchCampaigns]);
  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: _jsxDEV(
        'div',
        {
          className: 'container',
          children: [
            _jsxDEV(
              'div',
              {
                className: 'explore-header',
                children: [
                  _jsxDEV(
                    'h1',
                    {
                      children: 'Explore Campaigns',
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    'p',
                    {
                      className: 'text-secondary',
                      style: {
                        marginTop: 'var(--space-2)',
                        fontSize: 'var(--text-lg)',
                      },
                      children: 'Discover causes worth supporting and make an impact today.',
                    },
                    void 0,
                    false
                  ),
                  _jsxDEV(
                    'div',
                    {
                      className: 'filter-bar',
                      children: [
                        _jsxDEV(
                          'form',
                          {
                            onSubmit: handleSearch,
                            className: 'search-input-wrapper',
                            children: [
                              _jsxDEV(
                                'svg',
                                {
                                  viewBox: '0 0 24 24',
                                  fill: 'none',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  children: [
                                    _jsxDEV(
                                      'circle',
                                      {
                                        cx: '11',
                                        cy: '11',
                                        r: '8',
                                      },
                                      void 0,
                                      false
                                    ),
                                    _jsxDEV(
                                      'line',
                                      {
                                        x1: '21',
                                        y1: '21',
                                        x2: '16.65',
                                        y2: '16.65',
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
                                'input',
                                {
                                  type: 'text',
                                  className: 'form-input',
                                  placeholder: 'Search campaigns...',
                                  value: searchInput,
                                  onChange: (e) => setSearchInput(e.target.value),
                                  id: 'explore-search',
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
                          'select',
                          {
                            className: 'form-input',
                            value: sort,
                            onChange: handleSortChange,
                            style: {
                              width: 'auto',
                              minWidth: '160px',
                            },
                            id: 'explore-sort',
                            children: sortOptions.map((opt) =>
                              _jsxDEV(
                                'option',
                                {
                                  value: opt.value,
                                  children: opt.label,
                                },
                                opt.value,
                                false
                              )
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
                      className: 'filter-pills',
                      style: {
                        marginTop: 'var(--space-4)',
                      },
                      children: categories.map((cat) =>
                        _jsxDEV(
                          'button',
                          {
                            className: `filter-pill ${category === cat ? 'filter-pill-active' : ''}`,
                            onClick: () => handleCategoryChange(cat),
                            children: cat,
                          },
                          cat,
                          false
                        )
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
            loading
              ? _jsxDEV(
                  'div',
                  {
                    className: 'grid grid-3',
                    children: Array.from({
                      length: 6,
                    }).map((_, i) => _jsxDEV(SkeletonCard, {}, i, false)),
                  },
                  void 0,
                  false
                )
              : campaigns.length > 0
                ? _jsxDEV(
                    _Fragment,
                    {
                      children: [
                        _jsxDEV(
                          'div',
                          {
                            className: 'grid grid-3',
                            children: campaigns.map((campaign, i) =>
                              _jsxDEV(
                                CampaignCard,
                                {
                                  campaign: campaign,
                                  index: i,
                                },
                                campaign._id,
                                false
                              )
                            ),
                          },
                          void 0,
                          false
                        ),
                        pagination &&
                          pagination.pages > 1 &&
                          _jsxDEV(
                            'div',
                            {
                              className: 'flex justify-center gap-3',
                              style: {
                                marginTop: 'var(--space-10)',
                              },
                              children: [
                                _jsxDEV(
                                  'button',
                                  {
                                    className: 'btn btn-outline',
                                    disabled: page <= 1,
                                    onClick: () => setPage((p) => p - 1),
                                    children: 'Previous',
                                  },
                                  void 0,
                                  false
                                ),
                                _jsxDEV(
                                  'span',
                                  {
                                    className: 'flex items-center text-sm text-muted',
                                    children: ['Page ', page, ' of ', pagination.pages],
                                  },
                                  void 0,
                                  true
                                ),
                                _jsxDEV(
                                  'button',
                                  {
                                    className: 'btn btn-outline',
                                    disabled: page >= pagination.pages,
                                    onClick: () => setPage((p) => p + 1),
                                    children: 'Next',
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
                  )
                : _jsxDEV(
                    EmptyState,
                    {
                      title: 'No campaigns found',
                      description: search
                        ? `No results for "${search}". Try a different search term.`
                        : 'No campaigns match your filters. Try adjusting your criteria.',
                      action: _jsxDEV(
                        'button',
                        {
                          className: 'btn btn-primary',
                          onClick: () => {
                            setSearch('');
                            setSearchInput('');
                            setCategory('All');
                          },
                          children: 'Clear filters',
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
  );
}
