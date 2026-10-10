# MERN-Auth

A full-stack authentication system built with the MERN stack: a secure Node.js REST API and a responsive React client. Users can sign up, verify their email with a one-time code, log in, reset a forgotten password and manage their profile, while an admin manages all accounts from a private dashboard.

**Live demo:** https://mern-auth-cyan-eta.vercel.app/login

> The API runs on a free hosting plan, so the first load may take up to a minute while the server wakes up.

## Screenshots

<p>
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329374/Screenshot_2026-10-07_021520_tbcpam.png" width="49%" alt="Screenshot 1" />
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329370/Screenshot_2026-10-07_021544_k6dcqw.png" width="49%" alt="Screenshot 2" />
</p>
<p>
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329573/Screenshot_2026-10-07_023231_ia9a9j.png" width="49%" alt="Screenshot 3" />
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329368/Screenshot_2026-10-07_021611_aobc4k.png" width="49%" alt="Screenshot 4" />
</p>
<p>
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329370/Screenshot_2026-10-07_021644_a06v1f.png" width="49%" alt="Screenshot 5" />
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329362/Screenshot_2026-10-07_021719_zykuw5.png" width="49%" alt="Screenshot 6" />
</p>
<p>
  <img src="https://res.cloudinary.com/a57m0ysa/image/upload/v1791329364/Screenshot_2026-10-07_022842_ryszrl.png" width="49%" alt="Screenshot 7" />
</p>

## Features

### API

- JWT authentication stored in an `httpOnly` cookie (7 days), with middleware that protects private routes
- Role-based access control for the admin endpoints (list users, view a user, delete a user, delete all users)
- Email verification with a 6-digit code that expires after 15 minutes, plus a resend endpoint
- Changing the email marks the account as unverified and sends a new code; changing the password rejects reusing the old one
- Password reset through a random, expiring token sent by email, with passwords hashed using bcrypt
- Request validation with express-validator
- Tiered rate limiting: 200 requests / 5 min in general, 20 / 5 min for auth routes, 15 / 10 min for sensitive actions
- Helmet security headers and a CORS allowlist
- Transactional emails (verification, welcome, password reset, password changed) through the Brevo API

### Client

- Sign-up, login, forgot password and reset password flows managed with Redux Toolkit and protected routes
- A six-box verification input that supports paste and one-time-code autofill on phones, with a resend cooldown
- Live password strength meter and clear loading and error states on every form
- Home page with the profile information, a modal to edit the profile, and an option to delete the account
- Admin dashboard to view and delete users, with confirmation dialogs
- Responsive layout with animated transitions (Framer Motion)

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Redux Toolkit, React Router, Tailwind CSS, Framer Motion, Lucide icons |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, express-validator, express-rate-limit, Helmet |
| Database | MongoDB Atlas |
| Email | Brevo API |
| Deployment | Vercel (client), Render (API) |

## Project Structure

```
MERN-Auth
├── backend
│   ├── controllers     # auth, user and admin logic
│   ├── db              # MongoDB connection
│   ├── middlewares     # verifyToken, verifyAdmin, validation, rate limiters
│   ├── models          # User schema
│   ├── nodemailer      # Brevo client and email templates
│   ├── routers         # auth, user and admin routes
│   ├── utils           # JWT cookie helper
│   └── index.js        # Express app entry point
├── frontend
│   └── src
│       ├── components  # Input, PasswordStrengthMeter, FloatingShape
│       ├── pages       # Login, SignUp, EmailVerification, Home, Admin, ...
│       └── redux       # store and the auth slice (async thunks)
└── package.json
```

## API Endpoints

All routes are prefixed with `/api/v1`.

### Auth (`/auth`)

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| POST | `/signup` | Create an account and send a verification code | Public |
| POST | `/verify-email` | Verify the email with the 6-digit code | Logged in |
| POST | `/resend-verification` | Send a new verification code | Logged in |
| POST | `/login` | Log in and set the session cookie | Public |
| POST | `/logout` | Clear the session cookie | Public |
| POST | `/forget-password` | Email a password reset link | Public |
| POST | `/reset-password/:token` | Set a new password using the token | Public |
| GET | `/check-auth` | Return the current user | Logged in |

### User (`/user`)

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| GET | `/` | Get the current profile | Logged in |
| PATCH | `/` | Update name, email or password | Logged in |
| DELETE | `/` | Delete the account | Logged in |

### Admin (`/admin`)

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| GET | `/users` | List all users | Admin |
| GET | `/user/:userId` | Get one user | Admin |
| DELETE | `/user/:userId` | Delete one user | Admin |
| DELETE | `/users` | Delete all users | Admin |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database (a free MongoDB Atlas cluster works)
- A Brevo account with an API key and a verified sender email

### 1. Clone and install

```bash
git clone https://github.com/saif11001/MERN-Auth.git
cd MERN-Auth
npm install
npm install --prefix frontend
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN=a_long_random_secret_for_signing_jwts
CLIENT_URL=http://localhost:5173
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender@example.com
PORT=3000
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Run in development

Start the API from the project root:

```bash
npm start
```

Start the client in a second terminal:

```bash
cd frontend
npm run dev
```

The client runs on http://localhost:5173 and the API on http://localhost:3000.

### Creating an admin

New accounts always get the `user` role. To make an admin, open your user document in MongoDB and set `role` to `"admin"`. The admin dashboard is then available at `/admin`.

## Deployment

- **Client (Vercel):** `frontend/vercel.json` rewrites `/api/*` to the API, so the browser only talks to the client's domain and the session cookie stays first-party. This is what keeps login working in Safari on iPhone. Leave `VITE_API_URL` empty in production.
- **API (Render):** set the same environment variables as above, plus `NODE_ENV=production`. In production the cookie is `Secure` with `SameSite=None`, and Express trusts two proxy hops (`trust proxy`) so the rate limiter sees the real visitor IP instead of the proxy's.

## What I Learned

- Cookie-based sessions across two domains are blocked by Safari, and a same-domain proxy is a clean fix.
- Behind more than one proxy, Express must be told how many hops to trust, otherwise rate limiting treats every visitor as one client.
- Small details make forms usable on phones: one-time-code autofill, paste support and a resend cooldown.
