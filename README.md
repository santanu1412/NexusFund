# NexusFund 💛

**Crowdfunding for Everyone** — A simple, clean, full-stack crowdfunding platform.

## Features

- 🎨 **Clean & Simple UI** — Light, trust-focused design with smooth animations
- 🔐 **Secure Authentication** — JWT with HTTP-only cookies and token rotation
- 💳 **Stripe Payments** — Full Stripe Checkout integration for donations
- ⚡ **Real-Time Updates** — Socket.IO powered live funding progress
- ☁️ **Image Uploads** — Cloudinary for campaign cover images
- 📊 **Personal Dashboard** — Track your campaigns and donations
- 🛡️ **Security** — Helmet, CORS, rate limiting, input validation
- 📱 **Mobile Responsive** — Designed for all screen sizes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Vanilla CSS, Framer Motion, Zustand |
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB (Mongoose) |
| Payments | Stripe Checkout |
| Storage | Cloudinary |
| Auth | JWT (HTTP-only cookies) |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for payments)
- Cloudinary account (for image uploads)

### Setup

1. **Configure environment variables**
   ```bash
   cp .env.example server/.env
   ```
   Fill in your actual credentials in `server/.env`.

2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Run the app**
   ```bash
   # Terminal 1 — Server
   cd server && npm run dev

   # Terminal 2 — Client
   cd client && npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret for access tokens |
| `JWT_REFRESH_SECRET` | ✅ | Secret for refresh tokens |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook secret |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret |
| `EMAIL_HOST` | ❌ | SMTP host (optional) |
| `EMAIL_PORT` | ❌ | SMTP port (optional) |
| `EMAIL_USER` | ❌ | SMTP user (optional) |
| `EMAIL_PASS` | ❌ | SMTP password (optional) |

## Pages

- **/** — Landing page with hero, featured campaigns, and stats
- **/explore** — Browse all campaigns with search, filters, and sorting
- **/campaigns/:id** — Campaign detail with donation, progress, and sharing
- **/login** — User login
- **/register** — User registration (donor or campaign creator)
- **/dashboard** — Personal dashboard (campaigns & donations)
- **/create** — Create a new campaign
- **/profile** — Edit profile and change password
- **/how-it-works** — Platform guide and FAQs
- **/payment-success** — Post-donation thank you page

## License

MIT © 2026 NexusFund
