import { create } from 'zustand';
import api from '../lib/api';

export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
  pagination: null,

  fetchCampaigns: async (params = {}) => {
    set({ loading: true });
    try {
      const queryString = new URLSearchParams(params).toString();
      const res = await api.get(`/campaigns?${queryString}`);
      set({
        campaigns: res.data.data,
        pagination: res.data.pagination,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCampaignBySlug: async (slugOrId) => {
    set({ loading: true, currentCampaign: null });
    try {
      const res = await api.get(`/campaigns/${slugOrId}`);
      set({ currentCampaign: res.data.data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Keep backward compat
  fetchCampaignById: async (id) => {
    return get().fetchCampaignBySlug(id);
  },

  createCampaign: async (campaignData) => {
    set({ loading: true });
    try {
      const res = await api.post('/campaigns', campaignData);
      set({ loading: false });
      return res.data.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Real-time update helper
  updateCampaignProgress: (id, data) => {
    const { campaigns, currentCampaign } = get();

    // Update list
    const updatedList = campaigns.map(c =>
      c._id === id ? { ...c, ...data } : c
    );

    // Update current view if matches
    let updatedCurrent = currentCampaign;
    if (currentCampaign && currentCampaign._id === id) {
      updatedCurrent = { ...currentCampaign, ...data };
    }

    set({ campaigns: updatedList, currentCampaign: updatedCurrent });
  },

  // Admin actions
  fetchAdminCampaigns: async (params = {}) => {
    set({ loading: true });
    try {
      const queryString = new URLSearchParams(params).toString();
      const res = await api.get(`/campaigns/admin/all?${queryString}`);
      set({
        campaigns: res.data.data,
        pagination: res.data.pagination,
        loading: false,
        error: null,
      });
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  approveCampaign: async (id) => {
    const res = await api.put(`/campaigns/admin/${id}/approve`);
    return res.data;
  },

  rejectCampaign: async (id, reason) => {
    const res = await api.put(`/campaigns/admin/${id}/reject`, { reason });
    return res.data;
  },
}));