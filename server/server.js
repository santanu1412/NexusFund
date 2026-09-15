import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { initSocket } from './socket/socketManager.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import connectRoutes from './routes/connectRoutes.js';
import withdrawalRoutes from './routes/withdrawalRoutes.js';
import updateRoutes from './routes/updateRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { stripeWebhook } from './webhooks/stripeWebhook.js';
dotenv.config();
const app = express();
const httpServer = createServer(app);
connectDB();
const io = initSocket(httpServer);
app.set('io', io);
app.post(
  '/api/webhooks/stripe',
  express.raw({
    type: 'application/json',
  }),
  stripeWebhook
);
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(
  express.json({
    limit: '10mb',
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/connect', connectRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/updates', updateRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(
    `🚀 NexusFund server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`
  );
});
