# Deals Platform

A full‑stack Deals & Claims platform built with **Next.js (App Router)** on the frontend and **Node.js/Express + MongoDB** on the backend. The app lets users browse curated deals, view detailed deal pages, claim offers, and track claim status — with proper authentication and verification gates.

---

## ✨ Features

* 🔍 Browse & search deals
* 🔒 Locked vs public deals (verification‑gated)
* 📄 Deal details page (full description, eligibility, partner info)
* ✅ Claim deals with optimistic UI
* 📊 My Claims dashboard (status tracking)
* 👤 Authentication & verification aware UI
* 🧠 Clean architecture (Hooks + Context, no API calls in pages)

---

## 🧱 Tech Stack

### Frontend

* **Next.js 14 (App Router)**
* **React + TypeScript**
* **Context API + Custom Hooks**
* **Axios** (single networking layer)
* **Tailwind CSS**
* **Framer Motion** (UI animations)

### Backend

* **Node.js + Express**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **REST APIs**

---

## 📁 Project Structure (Frontend)

```
app/
 ├─ deals/
 │   ├─ page.tsx            # Deals listing
 │   └─ [id]/page.tsx       # Deal details page
 ├─ my-claims/page.tsx      # User claims dashboard

context/
 ├─ DealsContext.ts
 ├─ DealsProvider.tsx
 └─ AuthContext.ts

hooks/
 └─ useDeals.ts             # All deal/claim logic

api/
 ├─ deals.api.ts
 └─ claims.api.ts

lib/
 └─ api.ts                  # Axios instance

types/
 └─ deals.ts
```

---

## 🧠 Architecture Principles

* ❌ No `fetch` / `axios` calls inside pages
* ✅ All side‑effects handled in **hooks**
* ✅ Global state shared via **Context**
* ✅ API response normalization in **API layer only**
* ✅ Strong TypeScript boundaries

> Pages are UI‑only. Hooks handle data. Context shares state.

---

## 🔌 API Layer (Example)

```ts
// api/deals.api.ts
export const fetchAllDealsAPi = async (): Promise<Deal[]> => {
  const res = await api.get("/deals");
  return res.data.deals ?? res.data ?? [];
};
```

---

## ⚙️ Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`.env`)

```env
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/deals-platform.git
cd deals-platform
```

### 2️⃣ Install dependencies

```bash
npm install
```


### 3️⃣ Run frontend

```bash
npm run dev
```
### 4️⃣ Seed initial data (Deals)

To populate the database with sample deals, run the seed script from the backend:

node seed/deals.seed.js

This will clear existing deals and insert predefined sample deals into MongoDB.

### 5 Run backend

```bash
npm run start
```

---

## 🧪 Key UX Behaviours

* Clicking a **deal card** opens the deal details page
* Clicking **Claim** does not trigger navigation (event propagation handled)
* Locked deals redirect unverified users to `/verify`
* Claims update optimistically

---

## 🧑‍💻 Author

Built by **Juned** as a production‑grade full‑stack project.

---

## 📌 Notes

* This project follows real‑world frontend architecture used in SaaS products
* Easy to extend with admin panels, pagination, or role‑based access

---

## 🔁 End-to-End Application Flow

1. User visits the Deals page
2. Frontend loads deals via `useDeals` hook
3. Hook calls backend APIs through the axios API layer
4. Backend validates request, fetches data from MongoDB, and returns normalized JSON
5. Deals are stored in context and rendered by UI-only pages
6. User clicks a deal card to open the Deal Details page
7. Deal details are fetched via context (`getDealById`)
8. User can claim a deal based on authentication and verification state

---

## 🔐 Authentication & Authorization Strategy

* JWT-based authentication handled on the backend
* Auth token is sent via HTTP-only cookies
* Frontend uses `AuthContext` to determine:

  * Logged-in state
  * Verification status
* Authorization rules:

  * Public deals → any logged-in user can claim
  * Locked deals → only verified users can claim
* Unauthorized users are redirected to `/login` or `/verify`

---

## 🎯 Internal Flow of Claiming a Deal

1. User clicks **Claim** on a deal
2. UI checks authentication & verification locally
3. `claimDeal` function from `useDeals` hook is triggered
4. Axios POST request is sent to backend `/claims/:dealId`
5. Backend:

   * Validates user via JWT
   * Checks deal access level & verification status
   * Creates a claim entry in DB with `pending` status
6. **Frontend immediately updates UI optimistically** by adding the claim to local state
7. User sees the deal as *Claimed* instantly (no waiting for refetch)
8. Claim appears instantly in **My Claims** dashboard
9. Backend remains the source of truth for final approval

---

## 🔄 Frontend ↔ Backend Interaction

* Frontend never directly uses `fetch`
* All API calls go through a centralized axios instance
* API layer normalizes responses before passing to hooks
* Hooks manage side effects and state
* Context exposes data to UI pages
* Backend exposes RESTful endpoints:

  * `GET /deals`
  * `GET /deals/:id`
  * `POST /claims/:dealId`
  * `GET /claims/me`

---

## 🗄️ Backend Structure & Responsibilities

```
backend/
 ├─ controllers/
 │   ├─ deal.controller.js     # Get deals, get deal by ID
 │   └─ claim.controller.js    # Claim creation & retrieval
 │
 ├─ models/
 │   ├─ Deal.js                # Deal schema (access level, partner, eligibility)
 │   └─ Claim.js               # Claim schema (user, deal, status)
 │
 ├─ routes/
 │   ├─ deal.routes.js         # /deals routes
 │   └─ claim.routes.js        # /claims routes
 │
 ├─ middleware/
 │   ├─ auth.middleware.js     # JWT authentication
 │   └─ verify.middleware.js  # Verification guard for locked deals
 │
 ├─ config/
 │   └─ db.js                  # MongoDB connection
 │
 └─ server.js                  # App bootstrap & route mounting
```

### Backend Flow

* Routes receive HTTP requests
* Middleware validates authentication & authorization
* Controllers execute business logic
* Mongoose models interact with MongoDB
* Clean JSON responses are returned to frontend

---

## ⚠️ Known Limitations / Weak Points

* No real-time claim status updates (requires refresh)
* No admin UI for approving/rejecting claims
* Error handling is basic (console + inline messages)
* No pagination for large deal lists
* No rate-limiting or request throttling

---

## 🚀 Improvements for Production Readiness

* Add server-side pagination and caching
* Introduce role-based access control (Admin, User)
* Add WebSocket / polling for live claim status updates
* Improve error handling with toast notifications
* Add request validation using Zod or Joi
* Add unit & integration tests
* Add monitoring and logging (Winston / Datadog)

---

## 🎨 UI & Performance Considerations

* Skeleton loaders used during data fetch
* Optimistic UI updates for instant feedback
* Context minimizes unnecessary prop drilling
* `useMemo` used for search & filtering
* Animations kept lightweight using Framer Motion
* Pages kept UI-only to avoid re-renders from side effects

---

## 📄 License

MIT License
