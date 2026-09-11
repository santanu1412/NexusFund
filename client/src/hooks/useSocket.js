import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useCampaignStore } from '../store/campaignStore';

const socket = io('/', {
  transports: ['websocket'],
  autoConnect: true,
});

export const useSocket = (campaignId) => {
  const updateCampaignProgress = useCampaignStore((state) => state.updateCampaignProgress);

  useEffect(() => {
    if (campaignId) {
      socket.emit('joinCampaign', campaignId);
    }

    const handleUpdate = (data) => {
      // data = { raisedAmount, backersCount }
      if (campaignId) {
        updateCampaignProgress(campaignId, data.raisedAmount, data.backersCount);
      }
    };

    socket.on('fundingUpdate', handleUpdate);

    return () => {
      socket.off('fundingUpdate', handleUpdate);
    };
  }, [campaignId, updateCampaignProgress]);

  return socket;
};