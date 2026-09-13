import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

/**
 * Hook to connect to Socket.IO and listen for real-time campaign funding updates.
 * @param {string} campaignId - The campaign ID to join the room for
 * @param {function} onUpdate - Callback when a funding update is received
 */
export function useSocket(campaignId, onUpdate) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!campaignId) return;

    // Connect to the server
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
