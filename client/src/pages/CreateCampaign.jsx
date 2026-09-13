import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCampaignStore } from '../store/campaignStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

const categories = ['Medical', 'Emergency', 'Education', 'Community', 'Memorial', 'Other'];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const { createCampaign } = useCampaignStore();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCoverImage(res.data.url);
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!coverImage) {
      toast.error('Please upload a cover image');
      return;
    }

    setLoading(true);
    try {
      const campaignData = {
        title: data.title,
        story: data.story,
        category: data.category,
        coverImage,
        goalAmountCents: Math.round(Number(data.goalAmount) * 100),
        deadline: data.deadline,
      };

      const campaign = await createCampaign(campaignData);
      toast.success('Campaign created! It will be reviewed shortly.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  // Calculate minimum deadline (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="page-content">
      <div className="container">
        <div className="create-form animate-fadeIn">
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Start a Campaign</h1>
          <p className="text-secondary" style={{ marginBottom: 'var(--space-8)' }}>
            Tell your story and set your fundraising goal. Your campaign will be reviewed before going live.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Cover Image */}
            <div className="form-group">
              <label className="form-label">Cover Image *</label>
              {coverImage ? (
                <div className="image-preview">
                  <img src={coverImage} alt="Campaign cover" />
                  <button
                    type="button"
                    className="image-preview-remove"
                    onClick={() => setCoverImage('')}
                    aria-label="Remove image"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="image-upload" onClick={() => fileInputRef.current?.click()}>
                  {uploading ? (
                    <div className="spinner" style={{ margin: '0 auto' }} />
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p>Click to upload a cover image</p>
                      <p style={{ fontSize: 'var(--text-xs)' }}>PNG, JPG up to 5MB</p>
                    </>
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="campaign-title">Campaign Title *</label>
              <input
                id="campaign-title"
                type="text"
                className={`form-input ${errors.title ? 'form-input-error' : ''}`}
                placeholder="e.g., Help Sarah's Medical Treatment"
                {...register('title', { required: 'Title is required', maxLength: { value: 120, message: 'Max 120 characters' } })}
              />
              {errors.title && <span className="form-error">{errors.title.message}</span>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label" htmlFor="campaign-category">Category *</label>
              <select
                id="campaign-category"
                className={`form-input ${errors.category ? 'form-input-error' : ''}`}
                {...register('category', { required: 'Category is required' })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category.message}</span>}
            </div>

            {/* Goal & Deadline */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="campaign-goal">Goal Amount (USD) *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)', fontWeight: 'var(--font-medium)'
                  }}>$</span>
                  <input
                    id="campaign-goal"
                    type="number"
                    className={`form-input ${errors.goalAmount ? 'form-input-error' : ''}`}
                    placeholder="500"
                    style={{ paddingLeft: 'var(--space-8)' }}
                    {...register('goalAmount', {
                      required: 'Goal amount is required',
                      min: { value: 10, message: 'Minimum goal is $10' },
                      max: { value: 999999, message: 'Maximum goal is $999,999' }
                    })}
                  />
                </div>
                {errors.goalAmount && <span className="form-error">{errors.goalAmount.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="campaign-deadline">Deadline *</label>
                <input
                  id="campaign-deadline"
                  type="date"
                  className={`form-input ${errors.deadline ? 'form-input-error' : ''}`}
                  min={minDate}
                  {...register('deadline', { required: 'Deadline is required' })}
                />
                {errors.deadline && <span className="form-error">{errors.deadline.message}</span>}
              </div>
            </div>

            {/* Story */}
            <div className="form-group">
              <label className="form-label" htmlFor="campaign-story">Your Story *</label>
              <textarea
                id="campaign-story"
                className={`form-input ${errors.story ? 'form-input-error' : ''}`}
                placeholder="Tell people why you're raising funds. Be specific, be honest, and share your story..."
                rows={8}
                {...register('story', {
                  required: 'Story is required',
                  minLength: { value: 50, message: 'Please write at least 50 characters' },
                  maxLength: { value: 10000, message: 'Max 10,000 characters' }
                })}
              />
              {errors.story && <span className="form-error">{errors.story.message}</span>}
              <span className="form-hint">Minimum 50 characters. Be detailed to build trust with donors.</span>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading || uploading} id="create-campaign-submit">
              {loading ? (
                <><div className="spinner spinner-sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} /> Creating...</>
              ) : (
                'Create Campaign'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
