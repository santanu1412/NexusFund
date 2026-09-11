import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import { useSocket } from '../hooks/useSocket';
import DonationWidget from '../components/campaigns/DonationWidget';
import ProgressBar from '../components/ui/ProgressBar';

const CampaignDetail = () => {
  const { id } = useParams();
  const { currentCampaign: campaign, fetchCampaignById, loading } = useCampaignStore();
  
  // Activate real-time listener
  useSocket(id);

  useEffect(() => {
    fetchCampaignById(id);
  }, [id, fetchCampaignById]);

  if (loading || !campaign) return <div className="pt-32 text-center text-cyan animate-pulse">Loading Neural Data...</div>;

  const progress = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10" />
        <img src={campaign.coverImage} alt={campaign.title} className="w-full h-full object-cover" />
        
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-12">
          <span className="bg-cyan/20 text-cyan border border-cyan/20 px-3 py-1 rounded text-xs font-bold mb-4 inline-block">
            {campaign.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 text-white shadow-lg">
            {campaign.title}
          </h1>
          <div className="flex items-center gap-4">
            <img src={campaign.creator?.avatar || '/default-avatar.png'} alt="Creator" className="w-10 h-10 rounded-full border border-white/20" />
            <div className="text-sm">
              <p className="text-gray-400">Created by</p>
              <p className="text-white font-bold">{campaign.creator?.name || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left: Description */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-8 mb-8 border-b border-white/10 pb-4">
            <button className="text-cyan border-b-2 border-cyan pb-4 -mb-4 font-bold">Story</button>
            <button className="text-gray-400 hover:text-white transition-colors pb-4">FAQ</button>
            <button className="text-gray-400 hover:text-white transition-colors pb-4">Updates</button>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-sora">
            {campaign.description.split('\n').map((line, i) => (
              <p key={i} className="mb-4">{line}</p>
            ))}
          </div>
        </div>

        {/* Right: Donation Sidebar */}
        <div className="lg:col-span-1">
          <DonationWidget campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;