import { Server } from 'socket.io';
let io;
export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);
    socket.on('joinCampaign', (campaignId) => {
      socket.join(`campaign:${campaignId}`);
      console.log(`Socket ${socket.id} joined campaign:${campaignId}`);
    });
    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
  return io;
};
export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};
export const emitFundingUpdate = (campaignId, data) => {
  if (io) {
    io.to(`campaign:${campaignId}`).emit('fundingUpdate', data);
  }
};
