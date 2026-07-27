# Smart City Citizen Services Portal

A full-stack MERN application that lets citizens report civic issues, apply for certificates, and pay utility bills online, while giving city administrators a dedicated panel to manage and resolve these requests — including a live GIS map of complaint locations.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Folder Structure](#folder-structure)
6. [Architecture](#architecture)
7. [Installation](#installation)
8. [Environment Variables](#environment-variables)
9. [Main Modules](#main-modules)
10. [API Summary](#api-summary)
11. [Authentication](#authentication)
12. [Future Improvements](#future-improvements)
13. [Screenshots](#screenshots)
14. [Author](#author)

---

## Project Overview

The **Smart City Citizen Services Portal** is a citizen-facing web platform paired with an admin control panel. Citizens can:

- Lodge civic complaints (street lights, road damage, water supply, garbage collection) with a photo and a map-picked location
- Track a complaint using a public complaint ID, with no login required
- Apply for certificates by uploading Aadhaar and supporting documents
- View and pay utility bills
- Receive in-app notifications when the status of a complaint, certificate, or bill changes

Administrators (a separate login system from citizens) can:

- View a dashboard of aggregated stats (complaint counts by status/category, certificate counts, total revenue, paid/unpaid bills)
- Review and update the status of complaints and certificates, with remarks
- Create and manage bills for specific citizens
- Visualize all complaints on an interactive GIS map, color-coded by status
- Send emails to a single user or broadcast to all registered users
- Export all complaints to an Excel (.xlsx) file

## Problem Statement

City residents typically have no single, transparent channel to report civic problems, apply for basic certificates, or track the status of their utility bills — issues get reported informally (phone calls, in-person visits) and are hard to track or audit. This project centralizes these citizen–government interactions into one portal: every complaint gets a traceable ID and status history, every certificate application is auditable, and every bill and notification is tied to a specific citizen account.

## Features

**Citizen-facing**
- Registration and login (JWT-based)
- Lodge a complaint with title, category, description, photo upload, and a location selected on a Leaflet map (latitude, longitude, and area name)
- Track any complaint publicly by its complaint ID (no auth required)
- View personal complaint history
- Apply for a certificate with certificate type, purpose, address, and two file uploads (Aadhaar file, supporting file)
- View personal certificates and their status
- View and pay bills assigned to the logged-in citizen
- View and mark notifications as read
- Update profile, including profile picture upload

**Admin-facing**
- Separate admin login, gated registration (requires a setup key)
- Dashboard with live counts: complaints by status and category, certificates by status, bills paid/unpaid, and total revenue collected
- View all complaints, update status, view full detail per complaint
- Export all complaints to an Excel spreadsheet
- View all certificates, review documents, approve/reject with remarks
- Create bills for a citizen (matched by name + mobile number), edit, delete, or mark as paid
- GIS map showing every complaint pinned by location, marker color reflecting status (e.g., red/orange/green)
- Send email notifications to one citizen or all citizens
- Admin profile management and password change

## Tech Stack

**Frontend**
- React 19 (Vite build tooling)
- React Router v7 (client-side routing, including protected admin routes)
- Axios (API communication)
- Leaflet, React-Leaflet, leaflet-geosearch, leaflet-defaulticon-compatibility (interactive maps and location picking)
- Chart.js + react-chartjs-2 (dashboard visualizations)
- GSAP, @gsap/react, Framer Motion (UI animation)
- react-icons

**Backend**
- Node.js with Express 5
- MongoDB with Mongoose 9 (ODM)
- JSON Web Tokens (`jsonwebtoken`) for authentication
- bcryptjs (password hashing)
- Multer (disk storage for uploaded images/documents)
- Nodemailer (Gmail SMTP email delivery)
- xlsx (Excel file generation for complaint export)
- cors, dotenv

## Folder Structure

```
smart-city-citizen-services-portal-main/
├── backend/
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── emailConfig.js      # Nodemailer transporter (Gmail SMTP)
│   ├── controllers/
│   │   ├── adminAuthController.js
│   │   ├── adminDashboardController.js
│   │   ├── authController.js
│   │   ├── billController.js
│   │   ├── certificateController.js
│   │   ├── complaintController.js
│   │   ├── emailController.js
│   │   └── notificationController.js
│   ├── middleware/
│   │   ├── adminAuth.js        # JWT verification for admins
│   │   ├── authMiddleware.js   # JWT verification for citizens (protect)
│   │   └── uploadMiddleware.js # Multer disk storage config
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Bill.js
│   │   ├── Certificate.js
│   │   ├── Complaint.js
│   │   ├── EmailLog.js
│   │   ├── Notification.js
│   │   └── User.js
│   ├── routes/                 # One route file per module
│   ├── utils/
│   │   └── emailTemplate.js    # HTML email template generator
│   ├── public/email-assets/    # Static images used inside emails
│   ├── uploads/                # Multer file storage (served at /uploads)
│   └── server.js               # Express app entry point
│
└── frontend/
    └── src/
        ├── pages/               # Citizen pages + Admin pages (23 total)
        ├── components/
        │   ├── AuthSection.jsx        # Citizen/Admin login & register UI
        │   ├── AdminProtectedRoute.jsx
        │   ├── AdminSidebar.jsx
        │   ├── LocationPicker.jsx     # Leaflet-based map picker
        │   ├── Navbar.jsx
        │   └── ...
        ├── services/
        │   └── authService.js  # Axios calls for auth + admin auth
        ├── config/
        │   └── api.js           # Reads VITE_API_URL
        └── App.jsx              # Route definitions
```

## Architecture

The application follows a standard three-tier MERN architecture:

```
Citizen / Admin Browser
        │
        ▼
  React (Vite) SPA  ──────────────►  Axios (Bearer token attached manually per call)
        │
        ▼
 Express REST API (server.js)
        │
        ├── Middleware: cors → express.json → static /uploads → route-level auth (protect / adminAuth)
        │
        ▼
  Controllers (business logic)
        │
        ▼
  Mongoose Models  ───────────►  MongoDB
        │
        └── Side effects: Notification.create(...) on complaint/certificate/bill changes,
            Nodemailer email dispatch (separate /api/email routes)
```

Two independent authentication flows exist side by side:
- **Citizen flow**: `authRoutes` → `authController` → `User` model → `protect` middleware reads the JWT into `req.user`
- **Admin flow**: `adminAuthRoutes` → `adminAuthController` → `Admin` model → `adminAuth` middleware reads the JWT into `req.admin`

File uploads (complaint images, certificate documents, profile pictures) are handled by Multer with disk storage, saved into `backend/uploads/`, and served back to the frontend via `express.static`.

## Installation

**Prerequisites:** Node.js, npm, a MongoDB instance (local or Atlas), a Gmail account for SMTP (if email features are needed).

```bash
# 1. Clone the repository
git clone <repository-url>
cd smart-city-citizen-services-portal-main

# 2. Install backend dependencies
cd backend
npm install

# 3. Create a .env file in backend/ (see Environment Variables below)

# 4. Start the backend
node server.js
# Server runs on the PORT defined in .env (default 5000)

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Create a .env file in frontend/ (see Environment Variables below)

# 7. Start the frontend dev server
npm run dev
```

> Note: The repository does not include a `.env.example` file. The variables below were identified directly from where they are read in the source code.

## Environment Variables

**backend/.env**

| Variable | Used In | Purpose |
|---|---|---|
| `MONGO_URI` | `config/db.js` | MongoDB connection string |
| `JWT_SECRET` | `authMiddleware.js`, `adminAuth.js`, `authController.js`, `adminAuthController.js` | Signing/verifying citizen and admin JWTs |
| `PORT` | `server.js` | Port the Express server listens on (defaults to 5000) |
| `EMAIL_USER` | `emailConfig.js`, `emailController.js` | Gmail account used as SMTP sender |
| `EMAIL_PASS` | `emailConfig.js` | Gmail app password for SMTP auth |

**frontend/.env**

| Variable | Used In | Purpose |
|---|---|---|
| `VITE_API_URL` | `src/config/api.js` | Base URL of the backend API that all Axios calls are built from |

## Main Modules

**1. Authentication (Citizen + Admin)**
Two parallel systems. Citizens register/login through `/api/auth`; admins are created only with a hardcoded setup key and log in through `/api/admin`. Both issue a 7-day JWT signed with `JWT_SECRET`, containing the user/admin's `id` and `role`.

**2. Complaint Management**
Citizens submit a complaint with a title, category, description, an optional photo, and a location (latitude, longitude, area) picked via an interactive map. Each complaint gets an auto-generated ID in the form `SC-<year>-<sequence>`. Admins can view all complaints, filter/update their status, view full details, and export the full list to Excel. Anyone can track a complaint by ID without logging in.

**3. Certificate Management**
Citizens apply for a certificate by specifying a type and purpose, and uploading an Aadhaar file and a supporting document. Each application gets an ID like `CERT-<timestamp suffix>`. Admins review, approve/reject, and attach remarks.

**4. Bill Management**
Admins create a bill for a citizen by entering their name and mobile number (the system looks up the matching `User`); each bill gets an ID like `BL-<sequence>`. Citizens can view and pay their own bills; admins can edit or delete bills.

**5. Notifications**
A `Notification` document is created automatically whenever a complaint, certificate, or bill changes state (submitted, status update, paid, etc.). Citizens fetch their notifications and mark them read.

**6. Email**
Admins can send a styled HTML email (with a Smart City header/footer) to one citizen by email address, or broadcast the same message to every registered user.

**7. Admin Dashboard**
Aggregated counts across complaints (by status and by category), certificates (by status), and bills (paid vs. unpaid, plus total revenue from paid bills), computed via `countDocuments` queries.

**8. GIS Map**
An admin-only Leaflet map that plots every complaint at its recorded latitude/longitude, using different colored markers to represent complaint status at a glance.

## API Summary

| Module | Base Path | Endpoints |
|---|---|---|
| Citizen Auth | `/api/auth` | register, login, get profile, update profile (with picture upload) |
| Admin Auth | `/api/admin` | register (setup-key gated), login, get profile, update profile, change password |
| Complaints | `/api/complaints` | create, get my complaints, get all (admin), get by Mongo ID, get by complaint ID (public track), update status (admin), export to Excel (admin) |
| Certificates | `/api/certificates` | create (with file uploads), get my certificates, get all (admin), get by ID (admin), update status (admin) |
| Bills | `/api/bills` | get all (admin), get my bills, create (admin), update (admin), delete (admin), pay (citizen) |
| Email | `/api/email` | send to one user, send to all users |
| Notifications | `/api/notifications` | get by user ID, mark as read |
| Admin Dashboard | `/api/admin/dashboard` | get aggregated stats |

A full endpoint-by-endpoint breakdown (methods, request bodies, responses) is provided in `API_DOCUMENTATION.md`.

## Authentication

- Passwords are hashed with `bcryptjs` before being stored, for both `User` and `Admin` collections.
- On successful login, the server signs a JWT (`jsonwebtoken`) containing `{ id, role }`, valid for 7 days.
- Citizens send `Authorization: Bearer <token>`, validated by the `protect` middleware, which populates `req.user`.
- Admins send `Authorization: Bearer <token>`, validated by the `adminAuth` middleware, which populates `req.admin`.
- The frontend stores tokens in `localStorage` (`token`/`user` for citizens, `adminToken`/`admin` for admins) and attaches them manually per Axios request. A 401 response automatically clears the stored admin token via an Axios response interceptor in `authService.js`.
- Admin registration is not open — it requires a hardcoded setup key defined in `adminAuthController.js`.

## Future Improvements

Based on gaps observed in the current implementation:

- Add a `.env.example` file for both frontend and backend so required variables are self-documented
- Centralize the Axios token-attachment logic (currently done manually per call) into a shared Axios instance/interceptor
- Remove or wire up the unused `EmailLog` model, or log sent emails to it for auditability
- Add request validation (e.g., using a schema validator) on controllers that currently trust `req.body` directly
- Add pagination to admin listing endpoints (`getAllComplaints`, `getAllCertificates`, `getBills`) as data grows
- Add automated tests for controllers and critical flows (auth, complaint lifecycle, bill payment)

## Screenshots

_Add screenshots of the citizen portal, complaint tracking, admin dashboard, and GIS map here._

| Home / Portal | Lodge Complaint | Admin Dashboard | GIS Map |
|---|---|---|---|
| _screenshot_ | _screenshot_ | _screenshot_ | _screenshot_ |

## Author

**Rudra Pratap Singh**
