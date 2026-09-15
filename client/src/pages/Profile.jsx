import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/users/me', {
        name,
        bio,
      });
      updateUser(res.data.data);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setChangingPassword(true);
    try {
      await api.put('/users/me/password', {
        currentPassword,
        newPassword,
      });
      toast.success('Password changed!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };
  const getInitial = (n) => (n ? n.charAt(0).toUpperCase() : '?');
  return _jsxDEV(
    'div',
    {
      className: 'page-content',
      children: _jsxDEV(
        'div',
        {
          className: 'container',
          style: {
            maxWidth: '640px',
          },
          children: _jsxDEV(
            'div',
            {
              className: 'animate-fadeIn',
              children: [
                _jsxDEV(
                  'div',
                  {
                    className: 'profile-header',
                    children: [
                      _jsxDEV(
                        'div',
                        {
                          className: 'avatar avatar-xl',
                          children:
                            user?.avatar && user.avatar !== '/default-avatar.png'
                              ? _jsxDEV(
                                  'img',
                                  {
                                    src: user.avatar,
                                    alt: user.name,
                                    style: {
                                      width: '100%',
                                      height: '100%',
                                      borderRadius: '50%',
                                      objectFit: 'cover',
                                    },
                                  },
                                  void 0,
                                  false
                                )
                              : getInitial(user?.name),
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'div',
                        {
                          children: [
                            _jsxDEV(
                              'h1',
                              {
                                style: {
                                  fontSize: 'var(--text-2xl)',
                                },
                                children: user?.name,
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'p',
                              {
                                className: 'text-secondary',
                                children: user?.email,
                              },
                              void 0,
                              false
                            ),
                            _jsxDEV(
                              'span',
                              {
                                className: `badge ${user?.role === 'beneficiary' ? 'badge-primary' : 'badge-success'}`,
                                style: {
                                  marginTop: 'var(--space-2)',
                                },
                                children:
                                  user?.role === 'beneficiary' ? 'Campaign Creator' : 'Supporter',
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
                    className: 'card-flat',
                    style: {
                      marginBottom: 'var(--space-6)',
                    },
                    children: [
                      _jsxDEV(
                        'h3',
                        {
                          style: {
                            fontSize: 'var(--text-lg)',
                            marginBottom: 'var(--space-5)',
                          },
                          children: 'Edit Profile',
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'form',
                        {
                          onSubmit: handleSaveProfile,
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-5)',
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
                                      htmlFor: 'profile-name',
                                      children: 'Name',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'input',
                                    {
                                      id: 'profile-name',
                                      type: 'text',
                                      className: 'form-input',
                                      value: name,
                                      onChange: (e) => setName(e.target.value),
                                      maxLength: 50,
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
                                      htmlFor: 'profile-bio',
                                      children: 'Bio',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'textarea',
                                    {
                                      id: 'profile-bio',
                                      className: 'form-input',
                                      value: bio,
                                      onChange: (e) => setBio(e.target.value),
                                      placeholder: 'Tell us about yourself...',
                                      rows: 3,
                                      maxLength: 500,
                                      style: {
                                        minHeight: '80px',
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
                              'button',
                              {
                                type: 'submit',
                                className: 'btn btn-primary',
                                disabled: saving,
                                style: {
                                  alignSelf: 'flex-start',
                                },
                                children: saving ? 'Saving...' : 'Save Changes',
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
                    className: 'card-flat',
                    children: [
                      _jsxDEV(
                        'h3',
                        {
                          style: {
                            fontSize: 'var(--text-lg)',
                            marginBottom: 'var(--space-5)',
                          },
                          children: 'Change Password',
                        },
                        void 0,
                        false
                      ),
                      _jsxDEV(
                        'form',
                        {
                          onSubmit: handleChangePassword,
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-5)',
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
                                      htmlFor: 'current-password',
                                      children: 'Current Password',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'input',
                                    {
                                      id: 'current-password',
                                      type: 'password',
                                      className: 'form-input',
                                      value: currentPassword,
                                      onChange: (e) => setCurrentPassword(e.target.value),
                                      placeholder: 'Enter current password',
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
                                      htmlFor: 'new-password',
                                      children: 'New Password',
                                    },
                                    void 0,
                                    false
                                  ),
                                  _jsxDEV(
                                    'input',
                                    {
                                      id: 'new-password',
                                      type: 'password',
                                      className: 'form-input',
                                      value: newPassword,
                                      onChange: (e) => setNewPassword(e.target.value),
                                      placeholder: 'At least 6 characters',
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
                                className: 'btn btn-outline',
                                disabled: changingPassword || !currentPassword || !newPassword,
                                style: {
                                  alignSelf: 'flex-start',
                                },
                                children: changingPassword ? 'Changing...' : 'Change Password',
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
