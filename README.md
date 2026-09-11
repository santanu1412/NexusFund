# NexusFund 🚀

**Next-Gen Crowdfunding Platform** — A full-stack application built with React, Node.js, Express, MongoDB, Stripe, and Socket.IO.

## Features

- 🎨 **Cyberpunk UI** — Futuristic dark theme with glassmorphism, neon accents, and smooth animations
- 🔐 **JWT Authentication** — Secure HTTP-only cookie-based auth with access/refresh token rotation
- 💳 **Stripe Payments** — Full Stripe Checkout integration for campaign donations
- ⚡ **Real-Time Updates** — Socket.IO powered live funding progress
- ☁️ **Cloudinary Uploads** — Image upload and optimization for campaign covers
- 📊 **Dashboard** — Personal dashboard showing your campaigns and backed projects
- 🛡️ **Security** — Helmet, CORS, rate limiting, input validation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS, Framer Motion, Zustand |
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB (Mongoose) |
| Payments | Stripe Checkout |
| Storage | Cloudinary |
| Auth | JWT (HTTP-only cookies) |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Stripe account
- Cloudinary account

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/santanu1412/NexusFund.git
   cd NexusFund
   ```

2. **Configure environment variables**
   ```bash
   # Copy .env.example to both client and server
   cp .env.example server/.env
   cp .env.example client/.env
   ```
   Fill in your actual credentials in both `.env` files.

3. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. **Run the app**
   ```bash
   # Terminal 1 — Server
   cd server && npm run dev

   # Terminal 2 — Client
   cd client && npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Zustand state management
│   │   ├── hooks/          # Custom hooks (Socket.IO)
│   │   ├── lib/            # API client, utilities
│   │   └── styles/         # Global CSS & Tailwind
│   └── ...
├── server/                 # Express backend
│   ├── config/             # DB, Cloudinary, Stripe config
│   ├── controllers/        # Route handlers
│   ├── middleware/          # Auth, error, rate limit, upload
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── socket/             # Socket.IO manager
│   ├── utils/              # Helpers, email, JWT
│   └── webhooks/           # Stripe webhook handler
└── .env.example            # Environment template
```

## License

MIT © 2026 NexusFund
