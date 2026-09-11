import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // In a real app, you might verify the session_id here with the backend

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
      >
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      
      <h1 className="text-4xl font-orbitron font-bold mb-4">Transfer Complete</h1>
      <p className="text-gray-400 max-w-md mb-8">
        Your contribution has been successfully recorded on the blockchain (database). The creator thanks you for your support.
      </p>

      <div className="flex gap-4">
        <Link to="/dashboard" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded font-bold">
          View Dashboard
        </Link>
        <Link to="/" className="px-6 py-3 bg-cyan text-black hover:bg-cyan/90 rounded font-bold">
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;