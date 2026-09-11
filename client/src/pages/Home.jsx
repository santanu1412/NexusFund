import HeroSection from '../components/home/HeroSection';
import CampaignGrid from '../components/campaigns/CampaignGrid';
import { useCampaignStore } from '../store/campaignStore';
import { useEffect } from 'react';

const Home = () => {
  const { campaigns, fetchCampaigns, loading } = useCampaignStore();

  useEffect(() => {
    fetchCampaigns({ limit: 6 });
  }, [fetchCampaigns]);

  return (
    <div className="pb-20">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-orbitron font-bold">Trending <span className="text-cyan">Projects</span></h2>
          <a href="/explore" className="text-sm text-gray-400 hover:text-white transition-colors">View All &rarr;</a>
        </div>
        
        {loading ? (
          <div className="text-center py-20 animate-pulse text-cyan">Scanning Network...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <CampaignGrid key={campaign._id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Wrapper for grid item to match import in other files
const CampaignGridWrapper = ({ campaign }) => {
    // We already have CampaignCard, so let's just use that.
    // In a real app CampaignGrid might be a container, but here I'm mapping directly.
    // I will fix the import above to point to CampaignCard logic essentially
    return null; 
};

export default Home;