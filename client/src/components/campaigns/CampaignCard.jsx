import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar';

const CampaignCard = ({ campaign }) => {
  const percent = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group hover:border-cyan/50 transition-colors duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={campaign.coverImage} 
          alt={campaign.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-dark/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-cyan border border-cyan/20">
          {campaign.category}
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/campaigns/${campaign._id}`}>
          <h3 className="font-orbitron font-bold text-lg mb-2 truncate group-hover:text-cyan transition-colors">
            {campaign.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>
        
        <div className="mb-2 flex justify-between text-xs font-bold font-orbitron">
          <span className="text-white">${campaign.raisedAmount.toLocaleString()}</span>
          <span className="text-gray-500">of ${campaign.goalAmount.toLocaleString()}</span>
        </div>
        
        <ProgressBar progress={percent} />
        
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <img src={campaign.creator?.avatar || '/default-avatar.png'} alt="Creator" className="w-5 h-5 rounded-full" />
            <span>by {campaign.creator?.name || 'Unknown'}</span>
          </div>
          <span>{campaign.daysLeft} days left</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;