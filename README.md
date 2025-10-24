# 🧠 Fullstack HRD Management System

A modern fullstack web application for recruitment and employee content management — built with **Next.js**, **Hono.js**, and **Prisma ORM**.  
Developed by **Rifki Rusdi Satma Putra**, a Software Developer with experience in scalable fullstack applications and UI/UX optimization.

---

## 🚀 Overview

This project demonstrates a **clean fullstack architecture** using TypeScript across both backend and frontend.  
It includes authentication, CRUD post management, and file uploads — designed with scalability, maintainability, and developer experience in mind.

---

## ⚙️ Tech Stack

| Layer               | Technology                                     |
| ------------------- | ---------------------------------------------- |
| **Frontend**        | Next.js 15, TailwindCSS, DaisyUI, Lucide Icons |
| **Backend**         | Hono.js, Prisma ORM, Zod, JWT, Bcrypt          |
| **Database**        | PostgreSQL                                     |
| **Language**        | TypeScript                                     |
| **Package Manager** | pnpm                                           |
| **Deployment**      | Node.js 20+                                    |

## 🧩 Project Structure

### 📦 Backend

backend/
├─ prisma/                   # Prisma schema & migrations
│  ├─ schema.prisma
│  └─ seed.ts
├─ src/
│  ├─ controllers/           # Layer kontrol request-response
│  │  ├─ authController.ts
│  │  └─ postController.ts
│  ├─ middlewares/           # Middleware global
│  │  ├─ auth.ts             # JWT auth verification
│  │  └─ rateLimits.ts       # API rate limiter
│  ├─ routes/                # Routing layer
│  │  ├─ auth.ts
│  │  └─ post.ts
│  ├─ services/              # Business logic layer
│  │  └─ postService.ts
│  ├─ types/                 # Validasi & tipe Zod
│  │  ├─ authSchema.ts
│  │  ├─ formidable.d.ts
│  │  └─ post.ts
│  ├─ utils/                 # Helper utilities
│  │  ├─ jwt.ts              # Token sign & verify
│  │  └─ app.ts              # Hono app initialization
│  ├─ server.ts              # Entrypoint utama
│  └─ generated/             # Prisma client (auto)
├─ uploads/                  # Folder penyimpanan file upload
├─ .env                      # Variabel environment
├─ .gitignore
├─ package.json
├─ prisma.config.ts
├─ tsconfig.json


### 🎨 Frontend

frontend/
├─ app/
│  ├─ (auth)/                     # Auth routes (isolated layout group)
│  │  ├─ login/page.tsx
│  │  ├─ register/page.tsx
│  │  └─ unauthorized/page.tsx
│  ├─ (dashboard)/posts/          # Protected dashboard pages
│  │  ├─ page.tsx                 # List & CRUD posts
│  │  ├─ [id]/page.tsx            # Edit or view single post
│  │  └─ new/page.tsx             # Create new post
│  ├─ global-error.tsx            # Global error fallback
│  ├─ globals.css                 # Tailwind + DaisyUI base styles
│  ├─ layout.tsx                  # Root layout wrapper
│  ├─ not-found.tsx               # 404 page
│  └─ page.tsx                    # Landing / home
│
├─ components/
│  ├─ Background.tsx              # Gradient & blur decoration
│  ├─ Navbar.tsx                  # Top navigation
│  ├─ Pagination.tsx              # Page controls
│  ├─ PostCard.tsx                # Popup modal detail view
│  └─ PostForm.tsx                # Form create/update post
│
├─ lib/
│  ├─ api.ts                      # Wrapper untuk fetch ke backend
│  ├─ auth.ts                     # Token handler (localStorage + redirect)
│  └─ types.ts                    # Shared TS interfaces
│
├─ types/
│  └─ daisyui.d.ts                # Declaration fix untuk DaisyUI
│
├─ tailwind.config.js             # Tailwind + DaisyUI setup
├─ postcss.config.js
├─ next.config.ts
├─ package.json
├─ .env.local

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/yourusername/hrd-management-system.git
cd hrd-management-system

### 2️⃣ Install Dependencies

cd backend && pnpm install
cd ../frontend && pnpm install

## 🧱 Backend Setup

### Create `.env` in `/backend`

DATABASE_URL="postgresql://user:password@localhost:5432/hrd_db"
JWT_SECRET="your_jwt_secret"
PORT=8080

### Initialize Database

pnpm db:generate
pnpm db:push
# (optional) seed
pnpm db:seed

### Run Backend
pnpm dev

Backend runs on → **[http://localhost:8080](http://localhost:8080)**


## 🖥️ Frontend Setup

### Create `.env.local` in `/frontend`

NEXT_PUBLIC_API_URL=http://localhost:8080

### Run Frontend

pnpm dev

Frontend runs on → **[http://localhost:3000](http://localhost:3000)**

---

## 🧰 Commands

### Backend

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `pnpm dev`         | Run development server (Hono) |
| `pnpm build`       | Build for production          |
| `pnpm start`       | Start production build        |
| `pnpm db:generate` | Generate Prisma Client        |
| `pnpm db:push`     | Sync Prisma schema to DB      |
| `pnpm db:seed`     | Seed database with mock data  |

### Frontend

| Command      | Description             |
| ------------ | ----------------------- |
| `pnpm dev`   | Run development server  |
| `pnpm build` | Build production bundle |
| `pnpm start` | Run production build    |

---

## 💡 Technical Decisions

| Area           | Choice                | Reason                                            |
| -------------- | --------------------- | ------------------------------------------------- |
| **Framework**  | Hono.js               | Lightweight, fast, modular alternative to Express |
| **ORM**        | Prisma                | Type-safe, schema-first, modern DX                |
| **Validation** | Zod                   | Runtime validation + full TypeScript support      |
| **Auth**       | JWT + Bcrypt          | Secure, stateless authentication                  |
| **Frontend**   | Next.js App Router    | Clean routing & SSR for scalability               |
| **UI System**  | DaisyUI + TailwindCSS | Theme-aware styling with rapid development        |
| **Language**   | TypeScript            | Type-safety and maintainability across fullstack  |

---

## ✨ Features

* 🔐 Authentication (login/register with JWT)
* 📝 CRUD Post Management (Create, Read, Update, Delete)
* 🖼️ File Upload (image preview & storage)
* 🌓 Theme-aware UI (light/dark via DaisyUI)
* 🧭 Responsive layout and clean component design
* ⚡ Optimized build pipeline with pnpm

---

## 📸 Application Preview

Letakkan file screenshot pada `assets/screenshots/` dengan nama **1.jpg – 6.jpg**.

#### 🖥️ Post Detail

<p align="center">
  <img src="assets/screenshots/1.jpeg" alt="Post Detail" width="80%"/>
</p>

#### 🧾 Post Page

<p align="center">
  <img src="assets/screenshots/2.jpeg" alt="Post Page" width="80%"/>
</p>

#### ✍️ Responsive Mobile Post Page

<p align="center">
  <img src="assets/screenshots/3.jpeg" alt="Responsive Mobile Post Page" width="80%"/>
</p>

#### 🔐 Responsive Landing Page

<p align="center">
  <img src="assets/screenshots/4.jpeg" alt="Responsive Landing Page" width="80%"/>
</p>

#### 🧑‍💻 Register Page

<p align="center">
  <img src="assets/screenshots/5.jpg" alt="Register Page" width="80%"/>
</p>

#### 🎨 Login Page

<p align="center">
  <img src="assets/screenshots/6.jpeg" alt="Login Page" width="80%"/>
</p>

> All screenshots are captured from local running instances of the project.

---

## 🧠 Project Philosophy

This project follows **Clean Architecture principles**, separating:

* **Controller layer** → handles I/O
* **Service layer** → business logic
* **Type layer** → validation & schema typing
* **UI components** → reusable and theme-aware

The goal is to demonstrate scalable engineering patterns that are easy to maintain and extend.

---

## 👨‍💻 Author

**Rifki Rusdi Satma Putra**
Software Developer | Fullstack Engineer

💼 [LinkedIn](https://www.linkedin.com/in/rifkirusdi30/)
📧 [rifkirusdisatmaputra@gmail.com](mailto:rifkirusdisatmaputra@gmail.com)

> Passionate about building scalable systems with clean architecture, intuitive UI, and real-world usability.


