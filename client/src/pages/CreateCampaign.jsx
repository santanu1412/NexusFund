import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Medical', 'Emergency', 'Education', 'Community', 'Memorial', 'Other'];

const CreateCampaign = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const createCampaign = useCampaignStore((state) => state.createCampaign);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  // Gate: must be beneficiary or admin
  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-orbitron font-bold mb-4">Please Sign In</h2>
        <p className="text-gray-400 mb-6">You need to be logged in to create a campaign.</p>
        <Link to="/login" className="px-6 py-3 bg-cyan text-black font-bold rounded-lg">Sign In</Link>
      </div>
    );
  }

  if (user.role !== 'beneficiary' && user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-orbitron font-bold mb-4">Beneficiary Account Required</h2>
        <p className="text-gray-400 mb-6">Only verified beneficiaries can create campaigns. Please register as a beneficiary to get started.</p>
        <Link to="/register" className="px-6 py-3 bg-violet text-white font-bold rounded-lg">Register as Beneficiary</Link>
      </div>
    );
  }

  if (user.role === 'beneficiary' && !user.stripeOnboardingComplete) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="glass-card p-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-violet/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-orbitron font-bold mb-4">Identity Verification Required</h2>
          <p className="text-gray-400 mb-6">
            To protect our community, all campaign creators must complete Stripe identity verification before creating campaigns. This confirms your identity and enables secure fund transfers to your bank account.
          </p>
          <Link 
            to="/onboarding" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-violet to-cyan text-white font-bold font-orbitron rounded-lg hover:opacity-90 transition-opacity"
          >
            COMPLETE VERIFICATION
          </Link>
        </div>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) return toast.error('Please upload a cover image');

    try {
      setUploading(true);
      
      // 1. Upload Image
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const imageUrl = uploadRes.data.url;

      // 2. Create Campaign (convert dollars to cents)
      const campaignData = {
        title: data.title,
        story: data.story,
        category: data.category,
        coverImage: imageUrl,
        goalAmountCents: Math.round(Number(data.goalAmount) * 100),
        deadline: new Date(data.deadline).toISOString(),
      };

      await createCampaign(campaignData);
      
      toast.success('Campaign submitted for review!');
      navigate('/dashboard');
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to create campaign');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-orbitron font-bold mb-2 text-center">Create a <span className="text-cyan">Campaign</span></h1>
      <p className="text-center text-gray-400 mb-8 text-sm">Your campaign will be reviewed by our team before going live.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 glass-card p-8">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Campaign Title</label>
          <input 
            {...register('title', { required: 'Title is required' })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none transition-colors"
            placeholder="e.g., Help with medical expenses"
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
          <select 
            {...register('category', { required: true })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c} className="bg-dark">{c}</option>
            ))}
          </select>
        </div>

        {/* Story */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Your Story</label>
          <textarea 
            {...register('story', { required: 'Story is required', minLength: { value: 50, message: 'Please tell your story in at least 50 characters' } })}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none h-40 resize-none"
            placeholder="Tell your story... Why do you need help? What will the funds be used for?"
          />
          {errors.story && <span className="text-red-500 text-xs">{errors.story.message}</span>}
        </div>

        {/* Goal & Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Goal Amount ($)</label>
            <input 
              type="number"
              step="1"
              {...register('goalAmount', { required: true, min: { value: 10, message: 'Minimum goal is $10' } })}
              className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none"
              placeholder="1000"
            />
            {errors.goalAmount && <span className="text-red-500 text-xs">{errors.goalAmount.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Deadline</label>
            <input 
              type="date"
              {...register('deadline', { required: true })}
              className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-cyan outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image</label>
          <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-cyan/50 transition-colors">
            <input type="file" onChange={handleImageChange} className="hidden" id="file-upload" accept="image/*" />
            <label htmlFor="file-upload" className="cursor-pointer">
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
              ) : (
                <div>
                  <svg className="w-10 h-10 mx-auto mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 text-sm">Click to upload cover image</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className="w-full py-4 bg-gradient-to-r from-cyan to-blue-600 font-bold font-orbitron rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {uploading ? 'Submitting for Review...' : 'SUBMIT CAMPAIGN'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Your campaign will be reviewed by our team within 24-48 hours before going live.
        </p>
      </form>
    </div>
  );
};

export default CreateCampaign;