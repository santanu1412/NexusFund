import { useEffect, useState, useCallback } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import CampaignCard from '../components/campaigns/CampaignCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import { Link } from 'react-router-dom';

const categories = ['All', 'Medical', 'Emergency', 'Education', 'Community', 'Memorial', 'Other'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'ending', label: 'Ending Soon' },
  { value: 'funded', label: 'Most Funded' },
];

export default function Explore() {
  const { campaigns, loading, pagination, fetchCampaigns } = useCampaignStore();
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const loadCampaigns = useCallback(() => {
    const params = { page, limit: 12, sort };
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

  return (
    <div className="page-content">
      <div className="container">
        {/* Header */}
        <div className="explore-header">
          <h1>Explore Campaigns</h1>
          <p className="text-secondary" style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-lg)' }}>
            Discover causes worth supporting and make an impact today.
          </p>

          {/* Filters */}
          <div className="filter-bar">
            {/* Search */}
            <form onSubmit={handleSearch} className="search-input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="form-input"
                placeholder="Search campaigns..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                id="explore-search"
              />
            </form>

            {/* Sort */}
            <select className="form-input" value={sort} onChange={handleSortChange} style={{ width: 'auto', minWidth: '160px' }} id="explore-sort">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="filter-pills" style={{ marginTop: 'var(--space-4)' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${category === cat ? 'filter-pill-active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : campaigns.length > 0 ? (
          <>
            <div className="grid grid-3">
              {campaigns.map((campaign, i) => (
                <CampaignCard key={campaign._id} campaign={campaign} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center gap-3" style={{ marginTop: 'var(--space-10)' }}>
                <button
                  className="btn btn-outline"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </button>
                <span className="flex items-center text-sm text-muted">
                  Page {page} of {pagination.pages}
                </span>
                <button
                  className="btn btn-outline"
                  disabled={page >= pagination.pages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No campaigns found"
            description={search ? `No results for "${search}". Try a different search term.` : 'No campaigns match your filters. Try adjusting your criteria.'}
            action={
              <button className="btn btn-primary" onClick={() => { setSearch(''); setSearchInput(''); setCategory('All'); }}>
                Clear filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
