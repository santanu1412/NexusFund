import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('donor');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password, selectedRole);
      toast.success('Account created! Check your email to verify.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 glass-card border-t-4 border-violet">
        <h2 className="text-3xl font-orbitron font-bold text-center mb-8">Join NexusFund</h2>
        
        {/* Role Selection */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole('donor')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-bold transition-all ${
              selectedRole === 'donor'
                ? 'border-cyan bg-cyan/10 text-cyan'
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            <div className="text-lg mb-1">💝</div>
            I want to donate
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('beneficiary')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-bold transition-all ${
              selectedRole === 'beneficiary'
                ? 'border-violet bg-violet/10 text-violet'
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
            }`}
          >
            <div className="text-lg mb-1">🚀</div>
            I want to raise funds
          </button>
        </div>

        {selectedRole === 'beneficiary' && (
          <div className="mb-6 p-3 bg-violet/10 border border-violet/20 rounded-lg text-xs text-gray-300">
            <strong className="text-violet">Note:</strong> Beneficiaries must complete Stripe identity verification before creating campaigns. You'll be guided through this after registration.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input 
              {...register('name', { required: true })}
              className="w-full bg-dark/50 border border-white/10 p-3 rounded-lg text-white focus:border-violet outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input 
              {...register('email', { required: true })}
              type="email"
              className="w-full bg-dark/50 border border-white/10 p-3 rounded-lg text-white focus:border-violet outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input 
              {...register('password', { required: true, minLength: 6 })}
              type="password"
              className="w-full bg-dark/50 border border-white/10 p-3 rounded-lg text-white focus:border-violet outline-none transition-colors"
              placeholder="Min 6 characters"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-violet to-cyan text-white font-bold font-orbitron rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-violet hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;