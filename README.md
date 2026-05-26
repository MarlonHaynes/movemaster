# MoveMaster Pro

> **Full-stack SaaS platform for a Southern Ontario moving company — built to production grade with real business logic, persistent bookkeeping, and a complete admin operations suite.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-movemaster--seven.vercel.app-E85D04?style=flat&logo=vercel&logoColor=white)](https://movemaster-seven.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=flat&logo=jsonwebtokens&logoColor=white)

---

## Screenshots

| Homepage | Quote wizard |
|:---:|:---:|
| ![Homepage hero](./frontend/Docs/Screenshots/Homepage%20hero.png) | ![Quote wizard](./frontend/Docs/Screenshots/Quote.png) |

| City landing page | Customer dashboard |
|:---:|:---:|
| ![City landing page](./frontend/Docs/Screenshots/City%20Landing%20Page.png) | ![Customer dashboard](./frontend/Docs/Screenshots/Customer%20dashboard.png) |

| Admin operations | Job & invoice detail |
|:---:|:---:|
| ![Admin operations dashboard](./frontend/Docs/Screenshots/Admin%20Operations%20Dashboard.png) | ![Job and invoice detail](./frontend/Docs/Screenshots/Job%20invoice%20detail.png) |

---

## Overview

MoveMaster Pro is a complete, production-ready business platform simulating a real moving company operation. It demonstrates the full cycle of a customer-facing SaaS product — from public-facing marketing pages and a multi-step booking flow, through to an authenticated admin dashboard with real bookkeeping, invoicing, and financial reporting.

This is not a tutorial project or a template. Every page has real copy, every form submits real data, every number is calculated by real business logic running on the server.

**Live capabilities include:**
- Customers can request quotes, receive real-time price estimates, and pay deposits
- Admins can manage all jobs, update statuses, view client histories, and generate financial reports
- The backend stores all data in persistent JSON files — no database setup required
- The entire app runs in demo mode with no API keys or external services needed

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework with server and client components |
| TypeScript (strict) | End-to-end type safety across all components and API calls |
| Tailwind CSS v3 | Utility-first styling with a custom design system |
| React Context API | Global auth state and multi-step form state management |
| Custom Hooks | `useScrolled`, `useLocalStorage`, `useToast`, `useQuoteCalculator` |
| Lucide React | Icon system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 4 | REST API server |
| TypeScript (strict) | Fully typed controllers, services, and middleware |
| JSON file storage | Zero-dependency persistent data layer — no database setup |
| bcryptjs | Password hashing (salt rounds: 12) |
| JSON Web Tokens | Stateless auth with access + refresh token pattern |
| Nodemailer | Transactional email (quote confirmations, admin alerts) |
| express-validator | Request validation on every route |
| Helmet + CORS | Security headers and origin control |
| Rate limiting | Per-route limits for auth, quotes, and general API traffic |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│                                                     │
│  Next.js 14 App Router (port 3000)                  │
│  ├── Public pages (marketing, services, cities)     │
│  ├── Quote wizard (5-step multi-page form)          │
│  ├── Customer dashboard (quotes, bookings)          │
│  └── Admin dashboard (full business operations)     │
│                        │                           │
│              lib/api.ts (typed fetch client)        │
│              + JWT token management                 │
│              + auto-refresh on 401                  │
└──────────────────────────┬──────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌─────────────────────────────────────────────────────┐
│           Express API Server (port 4000)            │
│                                                     │
│  /api/v1/auth          JWT auth (register/login)    │
│  /api/v1/quotes        Quote submission + pricing   │
│  /api/v1/contact       Contact form                 │
│  /api/v1/bookkeeping   Admin-only operations suite  │
│                                                     │
│  Middleware stack:                                  │
│  Helmet → CORS → Morgan → Rate Limit → JWT Auth     │
│                                                     │
│  Data layer: JSON files in ./data/                  │
│  ├── users.json                                     │
│  ├── jobs.json          (29 seeded records)         │
│  ├── clients.json       (20 seeded records)         │
│  ├── invoices.json      (per-job, auto-generated)   │
│  ├── transactions.json  (55 payment records)        │
│  └── messages.json                                  │
└─────────────────────────────────────────────────────┘
```

---

## Key Features

### Customer-Facing
- **12-section homepage** — hero, stats, services, how-it-works, coverage, crew, pricing, blog, CTA
- **5-step quote wizard** — move size selection, origin/destination, add-ons, contact info, live price estimate
- **Real-time pricing engine** — server-authoritative calculation using hourly rates, long-distance fees, packing surcharges, floor penalties, and specialty item charges
- **Deposit booking flow** — Stripe payment intent creation with mock fallback
- **15 city landing pages** — SEO-optimised with local tips, filtered crew, and filtered reviews
- **8 service detail pages** — full descriptions, includes, add-ons, crew, FAQ
- **62 verified reviews** — filterable by service, city, and rating with pagination
- **12 crew profiles** — full bios, certifications, specialties, cities served
- **6-post blog** — full article content, category system, related posts
- **Customer dashboard** — quote history, booking status timeline, moving day checklist

### Admin Operations
- **Business overview dashboard** — real-time stats: total quotes, deposits collected, estimated pipeline, active customers, status breakdown, service distribution, city breakdown
- **Job management** — full list with search, filter by status/city/service, detail view with invoice and payment history, inline status updates
- **Client roster** — 20 clients with lifetime stats, move history, spending totals
- **Invoice history** — all 29 invoices with line items, payment status, balance due
- **Payment ledger** — 55 transactions with deposit and balance payment tracking
- **Financial report** — monthly revenue breakdown, service type analysis, top clients by spend
- **Contact messages** — unread count, full message view, mark read

### Technical Highlights
- **JWT auth with auto-refresh** — access tokens expire in 7 days; the API client automatically requests a new token on 401 without logging the user out
- **Role-based access control** — `authenticate` and `requireAdmin` middleware enforces access on every protected route
- **Server-side pricing validation** — the backend recalculates price independently on every quote submission; the client estimate is never trusted
- **Graceful demo fallback** — if `NEXT_PUBLIC_API_URL` is not set, the frontend falls back to localStorage-based auth and data storage automatically
- **Zero native dependencies** — the data layer uses JSON files instead of a compiled database driver, so `npm install` works on any OS without build tools

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1 — Start the backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:seed
npm run dev
```

The seed command populates the database with 3 years of realistic history — 29 jobs, 20 clients, 55 payment transactions, and $46,000+ in completed revenue. Server starts at `http://localhost:4000`.

### 2 — Start the frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
npm run dev
```

Open `http://localhost:3000`

**Live demo:** [https://movemaster-seven.vercel.app/](https://movemaster-seven.vercel.app/)

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@movemaster.pro | admin1234 |
| **Customer** | demo@movemaster.pro | demo1234 |

On the login page, use **Sign In as Demo User** or **Sign In as Admin** for one-click access.

---

## API Reference

All routes prefixed with `/api/v1`. Protected routes require `Authorization: Bearer <token>`.

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Create account |
| POST | `/auth/login` | — | Login, receive JWT pair |
| POST | `/auth/refresh` | — | Refresh access token |
| POST | `/auth/demo` | — | Sign in as demo user |
| GET | `/auth/me` | ✓ | Get own profile |
| PATCH | `/auth/me` | ✓ | Update profile |

### Quotes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/quotes/estimate` | — | Real-time price estimate (no save) |
| POST | `/quotes` | optional | Submit quote request |
| GET | `/quotes/mine` | ✓ customer | Get own quotes |
| GET | `/quotes` | ✓ admin | All quotes |
| PATCH | `/quotes/:id/status` | ✓ admin | Update status |
| POST | `/quotes/:id/confirm-deposit` | ✓ | Mark deposit paid |

### Bookkeeping (Admin only)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/bookkeeping/dashboard` | Full business stats dashboard |
| GET | `/bookkeeping/jobs` | Searchable job list |
| GET | `/bookkeeping/jobs/:id` | Job + invoice + transaction detail |
| PATCH | `/bookkeeping/jobs/:id/status` | Update job and auto-sync invoice |
| GET | `/bookkeeping/clients` | Client roster |
| GET | `/bookkeeping/clients/:id` | Client + full move history |
| GET | `/bookkeeping/invoices` | All invoices |
| GET | `/bookkeeping/transactions` | Payment ledger |
| POST | `/bookkeeping/transactions` | Record manual payment |
| GET | `/bookkeeping/report` | Annual financial report |
| GET | `/bookkeeping/messages` | Contact messages |

---

## Project Structure

```
frontend/                          backend/
├── app/                           ├── src/
│   ├── (main)/                    │   ├── config/
│   │   ├── services/[slug]/       │   │   └── env.ts
│   │   ├── cities/[slug]/         │   ├── database/
│   │   ├── crew/[id]/             │   │   ├── db.ts        ← JSON file store
│   │   ├── quote/                 │   │   └── seed.ts
│   │   ├── booking/               │   ├── middleware/
│   │   ├── pricing/               │   │   ├── auth.middleware.ts
│   │   ├── blog/[slug]/           │   │   ├── validate.middleware.ts
│   │   ├── reviews/               │   │   └── error.middleware.ts
│   │   ├── about/                 │   ├── models/
│   │   └── contact/               │   │   └── types.ts
│   ├── (auth)/                    │   ├── controllers/
│   │   ├── login/                 │   │   └── bookkeeping.controller.ts
│   │   ├── register/              │   ├── routes/
│   │   └── forgot-password/       │   │   └── bookkeeping.routes.ts
│   ├── (dashboard)/               │   ├── services/
│   │   └── dashboard/             │   │   ├── auth.service.ts
│   │       ├── quotes/            │   │   └── email.ts
│   │       ├── bookings/          │   └── utils/
│   │       └── profile/           │       ├── pricing.ts
│   └── admin/                     │       ├── response.ts
│       ├── quotes/                │       └── id.ts
│       ├── crew/                  └── index.ts
│       └── cities/
├── components/
│   ├── ui/          (8 components)
│   ├── quote/       (wizard steps)
│   ├── services/
│   ├── crew/
│   ├── reviews/
│   └── dashboard/
├── context/         (Auth, Quote)
├── data/            (static data layer)
├── firebase/        (auth + firestore with demo fallback)
├── hooks/           (custom React hooks)
├── lib/
│   ├── api.ts       ← typed API client
│   └── utils.ts
└── types/
    └── index.ts     ← 15+ TypeScript interfaces
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#0d1117` | Page backgrounds |
| Surface | `#161b22` | Cards, panels |
| Primary | `#e85d04` | CTAs, accents, highlights |
| Secondary | `#1e40af` | Supporting accents |
| Text Primary | `#f0f6fc` | Body text |
| Text Muted | `#8b949e` | Secondary text |
| Border | `#30363d` | Dividers, card borders |

**Fonts:** Oswald (headings) · DM Sans (body) · DM Mono (labels, code)

---

## Seeded Data

The seed script generates a realistic 2-year business history:

- **20 clients** with full profiles, lifetime stats, and referral sources
- **29 jobs** across all service types and Southern Ontario cities
  - 20 completed with final prices, crew notes, and timestamps
  - 1 in-progress (active today)
  - 4 confirmed upcoming moves
  - 4 pending quote requests
- **29 invoices** with itemized line items (base rate, packing, storage, specialty, long-distance surcharges)
- **55 transactions** — deposit and balance payments with full audit trail
- **$46,000+** in completed revenue across residential, commercial, long-distance, senior, and specialty moves
- **5 contact messages** (2 read, 3 unread)

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000   # Backend API URL

# Optional — enables real Firebase auth instead of localStorage
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Optional — enables real Stripe payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Backend (`backend/.env`)
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Optional — enables real email sending
SMTP_HOST=smtp.gmail.com
SMTP_USER=
SMTP_PASS=
```

All variables are optional. The app runs fully in demo mode without any of them.

---

## What I Built

This project represents several hundred hours of design and engineering work covering:

- A complete design system with custom Tailwind tokens, fonts, animations, and utility classes
- 30+ pages and routes with real content, zero placeholder text
- A pricing engine with 8 variables that mirrors real moving industry rate structures
- A multi-step form wizard with step validation, context driven state, and live price calculation
- A JWT authentication system with role based middleware and automatic token refresh
- A complete bookkeeping system with invoicing, payment tracking, and financial reporting
- A database seed system that generates years of realistic business history
- A typed API client with automatic auth, error handling, and localStorage fallback
- Full TypeScript coverage with 15+ shared interfaces across frontend and backend

---

*Built with Next.js 14, TypeScript, Express, and a lot of coffee.*