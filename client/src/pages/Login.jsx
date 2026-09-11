import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back, Commander.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 glass-card border-t-4 border-cyan">
        <h2 className="text-3xl font-orbitron font-bold text-center mb-8">System Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Access</label>
            <input 
              {...register('email')}
              type="email"
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-cyan outline-none"
              placeholder="user@nexus.io"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Security Key</label>
            <input 
              {...register('password')}
              type="password"
              className="w-full bg-dark/50 border border-white/10 p-3 rounded text-white focus:border-cyan outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-3 bg-cyan text-black font-bold font-orbitron hover:bg-cyan/90 transition-colors"
          >
            {loading ? 'Authenticating...' : 'INITIALIZE SESSION'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          New to Nexus? <Link to="/register" className="text-cyan hover:underline">Register Identity</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;