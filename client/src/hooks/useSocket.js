import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
export function useSocket(campaignId, onUpdate) {
  const socketRef = useRef(null);
  useEffect(() => {
    if (!campaignId) return;
    socketRef.current = io({
      transports: ['websocket', 'polling'],
    });
    const socket = socketRef.current;
    socket.on('connect', () => {
      socket.emit('joinCampaign', campaignId);
    });
    socket.on('fundingUpdate', (data) => {
      if (onUpdate) onUpdate(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [campaignId]);
  return socketRef.current;
}
