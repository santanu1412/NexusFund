import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const DonationWidget = ({ campaign }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleDonate = async () => {
    if (!user) return toast.error('Please login to donate');
    if (!amount || amount < 1) return toast.error('Minimum donation is $1');

    setLoading(true);
    try {
      const res = await api.post(`/donations/checkout/${campaign._id}`, {
        amount: Number(amount),
        anonymous: false,
      });
      
      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-dark/50 border border-white/10 rounded-xl p-6 backdrop-blur-md sticky top-24"
    >
      <h3 className="text-xl font-orbitron font-bold mb-4 text-white">Back this project</h3>
      
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">Enter Amount ($)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan font-bold">$</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-4 pl-10 pr-4 text-2xl font-bold text-white focus:border-cyan outline-none transition-all"
            placeholder="10"
          />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Target</span>
          <span className="text-white font-bold">${campaign.goalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Raised</span>
          <span className="text-cyan font-bold">${campaign.raisedAmount.toLocaleString()}</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan shadow-[0_0_10px_#00f5ff]" 
            style={{ width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full py-4 bg-cyan text-black font-bold font-orbitron rounded hover:bg-cyan/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'Processing...' : 'FUND NOW'}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Payment secured by Stripe. You will be redirected.
      </p>
    </motion.div>
  );
};

export default DonationWidget;