import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import ProgressBar from '../components/ui/ProgressBar';

const Dashboard = () => {
  const [data, setData] = useState({ campaigns: [], donations: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/users/dashboard');
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto pt-10">
      <h1 className="text-3xl font-orbitron font-bold mb-8">Command Center</h1>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-white/10 mb-8">
        <button 
          onClick={() => setActiveTab('campaigns')}
          className={`pb-4 px-2 ${activeTab === 'campaigns' ? 'border-b-2 border-cyan text-cyan' : 'text-gray-400'}`}
        >
          My Campaigns
        </button>
        <button 
          onClick={() => setActiveTab('donations')}
          className={`pb-4 px-2 ${activeTab === 'donations' ? 'border-b-2 border-cyan text-cyan' : 'text-gray-400'}`}
        >
          Backed Projects
        </button>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        {activeTab === 'campaigns' && (
          data.campaigns.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
              <p className="text-gray-400 mb-4">You haven't launched any projects yet.</p>
              <Link to="/create" className="text-cyan font-bold hover:underline">Start a Campaign</Link>
            </div>
          ) : (
            data.campaigns.map(camp => (
              <div key={camp._id} className="bg-dark/50 border border-white/10 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center">
                <img src={camp.coverImage} className="w-32 h-20 object-cover rounded bg-gray-800" alt="" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{camp.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                    <span>Raised: ${camp.raisedAmount}</span>
                    <span>Goal: ${camp.goalAmount}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${camp.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700'}`}>
                      {camp.status}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-48">
                   <ProgressBar progress={(camp.raisedAmount / camp.goalAmount) * 100} />
                </div>
              </div>
            ))
          )
        )}

        {activeTab === 'donations' && (
          data.donations.length === 0 ? (
            <p className="text-gray-400">You haven't backed any projects yet.</p>
          ) : (
            data.donations.map(donation => (
              <div key={donation._id} className="bg-white/5 p-6 rounded-xl border border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-cyan/20 rounded-full flex items-center justify-center text-cyan font-bold">
                    $
                  </div>
                  <div>
                    <h4 className="font-bold">Backed {donation.campaign?.title}</h4>
                    <p className="text-sm text-gray-400">{new Date(donation.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-cyan">${donation.amount}</span>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;