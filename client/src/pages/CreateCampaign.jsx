import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCampaignStore } from '../store/campaignStore';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from 'react/jsx-dev-runtime';
const categories = ['Medical', 'Emergency', 'Education', 'Community', 'Memorial', 'Other'];
export default function CreateCampaign() {
  const navigate = useNavigate();
  const { createCampaign } = useCampaignStore();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: _jsxDEV(
        'div',
        {
          className: 'container',
          children: _jsxDEV(
            'div',
            {
              className: 'create-form animate-fadeIn',
              children: [
                _jsxDEV(
                  'h1',
                  {
                    style: {
                      marginBottom: 'var(--space-2)',
                    },
                    children: 'Start a Campaign',
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'p',
                  {
                    className: 'text-secondary',
                    style: {
                      marginBottom: 'var(--space-8)',
                    },
                    children:
                      'Tell your story and set your fundraising goal. Your campaign will be reviewed before going live.',
                  },
                  void 0,
                  false
                ),
                _jsxDEV(
                  'form',
                  {
                    onSubmit: handleSubmit(onSubmit),
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-6)',
                    },
                    children: [
                      _jsxDEV(
                        'div',
                        {
                          className: 'form-group',
                          children: [
                            _jsxDEV(
                              'label',
                              {
                                className: 'form-label',
                                children: 'Cover Image *',
                              },
                              void 0,
                              false
                            ),
                            coverImage
                              ? _jsxDEV(
                                  'div',
                                  {
                                    className: 'image-preview',
                                    children: [
                                      _jsxDEV(
                                        'img',
                                        {
                                          src: coverImage,
                                          alt: 'Campaign cover',
                                        },
                                        void 0,
                                        false
                                      ),
                                      _jsxDEV(
                                        'button',
                                        {
                                          type: 'button',
                                          className: 'image-preview-remove',
                                          onClick: () => setCoverImage(''),
                                          'aria-label': 'Remove image',
                                          children: _jsxDEV(
                                            'svg',
                                            {
                                              width: '16',
                                              height: '16',
                                              viewBox: '0 0 24 24',
                                              fill: 'none',
                                              stroke: 'currentColor',
                                              strokeWidth: '2',
                                              children: [
                                                _jsxDEV(
                                                  'line',
                                                  {
                                                    x1: '18',
                                                    y1: '6',
                                                    x2: '6',
                                                    y2: '18',
                                                  },
                                                  void 0,
                                                  false
                                                ),
                                                _jsxDEV(
                                                  'line',
                                                  {
                                                    x1: '6',
                                                    y1: '6',
                                                    x2: '18',
                                                    y2: '18',
                                                  },
                                                  void 0,
                                                  false
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true
                                          ),
                                        },
                                        void 0,
                                        false
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true
                                )
                              : _jsxDEV(
                                  'div',
                                  {
                                    className: 'image-upload',
                                    onClick: () => fileInputRef.current?.click(),
                                    children: uploading
                                      ? _jsxDEV(
                                          'div',
                                          {
                                            className: 'spinner',
                                            style: {
                                              margin: '0 auto',
                                            },
                                          },
                                          void 0,
                                          false
                                        )
                                      : _jsxDEV(
                                          _Fragment,
                                          {
                                            children: [
                                              _jsxDEV(
                                                'svg',
                                                {
                                                  viewBox: '0 0 24 24',
                                                  fill: 'none',
                                                  stroke: 'currentColor',
                                                  strokeWidth: '1.5',
                                                  children: [
                                                    _jsxDEV(
                                                      'rect',
                                                      {
                                                        x: '3',
                                                        y: '3',
                                                        width: '18',
                                                        height: '18',
                                                        rx: '2',
                                                        ry: '2',
                                                      },
                                                      void 0,
                                                      false
                                                    ),
                                                    _jsxDEV(
                                                      'circle',
                                                      {
                                                        cx: '8.5',
                                                        cy: '8.5',
                                                        r: '1.5',
                                                      },
                                                      void 0,
                                                      false
                                                    ),
                                                    _jsxDEV(
                                                      'polyline',
                                                      {
                                                        points: '21 15 16 10 5 21',
                                                      },
                                                      void 0,
                                                      false
                                                    ),
                                                  ],
                                                },
                                                void 0,
                                                true
                                              ),
                                              _jsxDEV(
                                                'p',
                                                {
                                                  children: 'Click to upload a cover image',
                                                },
                                                void 0,
                                                false
                                              ),
                                              _jsxDEV(
                                                'p',
                                                {
                                                  style: {
                                                    fontSize: 'var(--text-xs)',
                                                  },
                                                  children: 'PNG, JPG up to 5MB',
                                                },
                                                void 0,
                                                false
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true
                                        ),
                                  },
                                  void 0,
                                  false
                                ),
                            _jsxDEV(
                              'input',
                              {
                                type: 'file',
                                ref: fileInputRef,
                                onChange: handleImageUpload,
                                accept: 'image/*',
                                style: {
                                  display: 'none',
                                },
                              },
                              void 0,
                              false
                            ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'div',
                        {
                          className: 'form-group',
                          children: [
                            _jsxDEV(
                              'label',
                              {
                                className: 'form-label',
                                htmlFor: 'campaign-title',
                                children: 'Campaign Title *',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'input',
                              {
                                id: 'campaign-title',
                                type: 'text',
                                className: `form-input ${errors.title ? 'form-input-error' : ''}`,
                                placeholder: "e.g., Help Sarah's Medical Treatment",
                                ...register('title', {
                                  required: 'Title is required',
                                  maxLength: {
                                    value: 120,
                                    message: 'Max 120 characters',
                                  },
                                }),
                              },
                              void 0,
                              false
                            ),
                            errors.title &&
                              _jsxDEV(
                                'span',
                                {
                                  className: 'form-error',
                                  children: errors.title.message,
                                },
                                void 0,
                                false
                              ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'div',
                        {
                          className: 'form-group',
                          children: [
                            _jsxDEV(
                              'label',
                              {
                                className: 'form-label',
                                htmlFor: 'campaign-category',
                                children: 'Category *',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'select',
                              {
                                id: 'campaign-category',
                                className: `form-input ${errors.category ? 'form-input-error' : ''}`,
                                ...register('category', {
                                  required: 'Category is required',
                                }),
                                children: [
                                  _jsxDEV(
                                    'option',
                                    {
                                      value: '',
                                      children: 'Select a category',
                                    },
                                    void 0,
                                    false
                                  ),
                                  categories.map((cat) =>
                                    _jsxDEV(
                                      'option',
                                      {
                                        value: cat,
                                        children: cat,
                                      },
                                      cat,
                                      false
                                    )
                                  ),
                                ],
                              },
                              void 0,
                              true
                            ),
                            errors.category &&
                              _jsxDEV(
                                'span',
                                {
                                  className: 'form-error',
                                  children: errors.category.message,
                                },
                                void 0,
                                false
                              ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'div',
                        {
                          style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--space-4)',
                          },
                          children: [
                            _jsxDEV(
                              'div',
                              {
                                className: 'form-group',
                                children: [
                                  _jsxDEV(
                                    'label',
                                    {
                                      className: 'form-label',
                                      htmlFor: 'campaign-goal',
                                      children: 'Goal Amount (USD) *',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'div',
                                    {
                                      style: {
                                        position: 'relative',
                                      },
                                      children: [
                                        _jsxDEV(
                                          'span',
                                          {
                                            style: {
                                              position: 'absolute',
                                              left: 'var(--space-4)',
                                              top: '50%',
                                              transform: 'translateY(-50%)',
                                              color: 'var(--color-text-muted)',
                                              fontWeight: 'var(--font-medium)',
                                            },
                                            children: '$',
                                          },
                                          void 0,
                                          false
                                        ),
                                        _jsxDEV(
                                          'input',
                                          {
                                            id: 'campaign-goal',
                                            type: 'number',
                                            className: `form-input ${errors.goalAmount ? 'form-input-error' : ''}`,
                                            placeholder: '500',
                                            style: {
                                              paddingLeft: 'var(--space-8)',
                                            },
                                            ...register('goalAmount', {
                                              required: 'Goal amount is required',
                                              min: {
                                                value: 10,
                                                message: 'Minimum goal is $10',
                                              },
                                              max: {
                                                value: 999999,
                                                message: 'Maximum goal is $999,999',
                                              },
                                            }),
                                          },
                                          void 0,
                                          false
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true
                                  ),
                                  errors.goalAmount &&
                                    _jsxDEV(
                                      'span',
                                      {
                                        className: 'form-error',
                                        children: errors.goalAmount.message,
                                      },
                                      void 0,
                                      false
                                    ),
                                ],
                              },
                              void 0,
                              true
                            ),
                            _jsxDEV(
                              'div',
                              {
                                className: 'form-group',
                                children: [
                                  _jsxDEV(
                                    'label',
                                    {
                                      className: 'form-label',
                                      htmlFor: 'campaign-deadline',
                                      children: 'Deadline *',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'input',
                                    {
                                      id: 'campaign-deadline',
                                      type: 'date',
                                      className: `form-input ${errors.deadline ? 'form-input-error' : ''}`,
                                      min: minDate,
                                      ...register('deadline', {
                                        required: 'Deadline is required',
                                      }),
                                    },
                                    void 0,
                                    false
                                  ),
                                  errors.deadline &&
                                    _jsxDEV(
                                      'span',
                                      {
                                        className: 'form-error',
                                        children: errors.deadline.message,
                                      },
                                      void 0,
                                      false
                                    ),
                                ],
                              },
                              void 0,
                              true
                            ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'div',
                        {
                          className: 'form-group',
                          children: [
                            _jsxDEV(
                              'label',
                              {
                                className: 'form-label',
                                htmlFor: 'campaign-story',
                                children: 'Your Story *',
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'textarea',
                              {
                                id: 'campaign-story',
                                className: `form-input ${errors.story ? 'form-input-error' : ''}`,
                                placeholder:
                                  "Tell people why you're raising funds. Be specific, be honest, and share your story...",
                                rows: 8,
                                ...register('story', {
                                  required: 'Story is required',
                                  minLength: {
                                    value: 50,
                                    message: 'Please write at least 50 characters',
                                  },
                                  maxLength: {
                                    value: 10000,
                                    message: 'Max 10,000 characters',
                                  },
                                }),
                              },
                              void 0,
                              false
                            ),
                            errors.story &&
                              _jsxDEV(
                                'span',
                                {
                                  className: 'form-error',
                                  children: errors.story.message,
                                },
                                void 0,
                                false
                              ),
                            _jsxDEV(
                              'span',
                              {
                                className: 'form-hint',
                                children:
                                  'Minimum 50 characters. Be detailed to build trust with donors.',
                              },
                              void 0,
                              false
                            ),
                          ],
                        },
                        void 0,
                        true
                      ),
                      _jsxDEV(
                        'button',
                        {
                          type: 'submit',
                          className: 'btn btn-primary btn-lg',
                          disabled: loading || uploading,
                          id: 'create-campaign-submit',
                          children: loading
                            ? _jsxDEV(
                                _Fragment,
                                {
                                  children: [
                                    _jsxDEV(
                                      'div',
                                      {
                                        className: 'spinner spinner-sm',
                                        style: {
                                          borderTopColor: '#fff',
                                          borderColor: 'rgba(255,255,255,0.3)',
                                        },
                                      },
                                      void 0,
                                      false
                                    ),
                                    ' Creating...',
                                  ],
                                },
                                void 0,
                                true
                              )
                            : 'Create Campaign',
                        },
                        void 0,
                        false
                      ),
                    ],
                  },
                  void 0,
                  true
                ),
              ],
            },
            void 0,
            true
          ),
        },
        void 0,
        false
      ),
    },
    void 0,
    false
  );
}
