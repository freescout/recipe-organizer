# 🍽️ Recipe Organizer

![CI](https://github.com/freescout/recipe-organizer/actions/workflows/ci.yml/badge.svg)

A full-stack monorepo app to manage, search, and plan recipes — built with Node.js, TypeScript, MongoDB, JWT Auth, and React/Next.js.
The project uses Yarn Workspaces and Docker Compose for easy local and production setup.

## 📋 Prerequisites

- Node.js 18+ and Yarn
- Docker & Docker Compose (for containerized setup)
- Git

## 📦 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt
- **API**: REST + OpenAPI
- **Testing**: Jest + Supertest (backend), Playwright (E2E)
- **UI development**: Storybook (component stories)
- **DevOps**: Docker, Docker Compose, GitHub Actions, Vercel, Render
- **Other**: Redis, RabbitMQ (upcoming)

## 🗂️ Monorepo Structure

```bash
server/        # Node.js + Express + TypeScript backend
├── src/
│   ├── controllers/         # auth, recipe: request handlers
│   ├── models/              # Mongoose models: User, Recipe
│   ├── routes/              # Express routers
│   ├── middlewares/         # requireAuth (JWT), upload (images)
│   ├── utils/               # jwt, slugify, error handling...
│   ├── config/              # Cloudinary setup
│   ├── docs/                # OpenAPI spec
│   ├── app.ts               # Express app (routes, middleware)
│   ├── db.ts                # MongoDB connection
│   └── index.ts             # Entry point: starts server + DB
├── tests/
│   ├── unit/                # jwt, slugify, requireAuth
│   └── integration/         # auth, recipes, image upload (Supertest)
├── scripts/                 # seed-user, print-token, seed
└── package.json

client/        # Next.js + React frontend
├── src/
│   ├── app/                 # App Router: pages and layouts
│   │   ├── components/      # Header, RecipeCard, RecipeForm...
│   │   ├── login/
│   │   ├── register/
│   │   └── recipes/
│   ├── context/             # AuthContext (user, login, logout)
│   ├── lib/                 # API client (axios)
│   └── types/
├── tests-e2e/               # Playwright end-to-end tests
├── playwright.config.ts
└── package.json

```

Root:

```bash
├── docker-compose.yml       # Local dev: client, server, MongoDB
├── docker-compose.test.yml  # MongoDB for backend tests (port 27018)
├── .github/workflows/       # CI: build, tests, deploy
├── package.json             # Yarn workspaces config
└── README.md
```

## ✅ Features (MVP)

- [x] User registration and login
- [x] JWT authentication
- [x] Recipe creation and management
- [x] Public/private toggle
- [x] Search by ingredient/tags
- [x] Favorite recipes
- [x] OpenAPI documentation

## 🚀 Getting Started

### 1. Clone and Install

Run this once at the root:

```bash
git clone https://github.com/freescout/recipe-organizer.git
cd recipe-organizer
yarn install
```

💡 This automatically installs and links dependencies for both the
server and client workspaces

### 2. Choose your Development Mode

### Option A: Docker Compose (Recommended)

Easiest setup: starts MongoDB, the server and the client together.

```bash
# 1. Create your env file
cp server/.env.example server/.env
```

Then edit `server/.env` (at least set your own `JWT_SECRET`):

```env
MONGO_URI=mongodb://mongo:27017/recipe-organizer-dev
JWT_SECRET=your-super-secret-key-change-this
PORT=7000
NODE_ENV=development
```

> `mongo` is the name of the MongoDB service in `docker-compose.yml`.
> Use a local database for development, **not** your production
> (Atlas) database: E2E tests create real users.

```bash
# 2. Start all services
docker compose up --build
```

This starts:

- Client: http://localhost:3001 (hot reload: `client/` is mounted)
- Server: http://localhost:7000 (after server changes, run `docker compose up --build` again)
- MongoDB: localhost:27017 (data kept in the `mongo-dev-data` volume)

To inspect the local database, connect **MongoDB Compass** to
`mongodb://localhost:27017`.

To start over with an empty database: `docker compose down -v`
(this deletes the volume and all local data).

### Option B - Local development (without Docker)

Better for development - faster hot reload and easier debugging.

Step 1: Start MongoDB

The easiest way is to run only the MongoDB container:

```bash
docker compose up mongo
```

(Or install MongoDB Community yourself, following the
[official instructions](https://www.mongodb.com/docs/manual/administration/install-community/).)

Step 2: Configure environment

```bash
cp server/.env.example server/.env
```

Edit server/.env

```env
MONGO_URI=mongodb://localhost:27017/recipe-organizer-dev
JWT_SECRET=your-super-secret-key-change-this
PORT=7000
NODE_ENV=development
```

Step 3: Start both workspaces

```bash
# Start both server and client concurrently
yarn dev

# Or run them separately in different terminals:
yarn workspace recipe-organizer-server dev
yarn workspace recipe-organizer-client dev
```

### 3. Verify Setup

- Client: http://localhost:3001 (local)
- Server: http://localhost:7000/api
- API Docs: http://localhost:7000/api/docs (

## 🧪 Tests

The backend uses **Jest** for both **unit** and **integration** tests:

- ✅ **Unit tests** for utilities like `jwt` (token handling) and `slugify`, with comprehensive edge case handling
- ✅ **Middleware tests** for `requireAuth` (JWT verification and route protection)
- ✅ Integration tests using Supertest and a real MongoDB test database (.env.test) to verify all recipe CRUD endpoints, authentication, and access control

```bash
# Run all tests
yarn workspace recipe-organizer-server test

```

### End-to-end tests (Playwright)

The client has **Playwright** E2E tests in `client/tests-e2e/`. They drive a real
Chromium browser through the app: register, login, logout, wrong password and
duplicate email. Each test creates its own user (random `@test.local` email),
so they work on an empty database.

> ⚠️ The tests create real users. Run them only against a **local** database,
> never against production.

```bash
# One-time: download the browser
yarn --cwd client playwright install chromium

# Start the app (client on :3001, server on :7000, local MongoDB)
docker compose up

# In another terminal
yarn --cwd client test:e2e

# Watch the browser / debug interactively
yarn --cwd client test:e2e --headed
yarn --cwd client test:e2e --ui

# Open the HTML report after a run
yarn --cwd client playwright show-report
```

## 🔧 Dev Scripts

Quick helper scripts for backend testing or seeding:

```bash
# Seed a test user
yarn workspace recipe-organizer-server ts-node scripts/seed-user.ts

# Generate a JWT for curl testing
yarn workspace recipe-organizer-server ts-node scripts/print-token.ts

# Browse UI components in Storybook (http://localhost:6006)
yarn --cwd client storybook

```

## 🔍 Exploring the API

Interactive API docs (Swagger UI) are available at
http://localhost:7000/api/docs when the server is running.

To call protected routes, get a token (log in, or run
`yarn workspace recipe-organizer-server ts-node scripts/print-token.ts`),
then click **Authorize** in Swagger UI and paste it.

## 🌐 Live Demo

The application is deployed and running at:

- Client: https://recipe-organizer-client.vercel.app
- API: https://recipe-organizer.onrender.com/api

## 📌 Roadmap

- [x] User authentication (JWT + bcrypt)
- [x] Recipe CRUD
- [x] Production deployment
- [x] Image uploads (Cloudinary)
- [ ] Meal planner + grocery list
- [ ] Redis cache for search
- [ ] Background jobs (RabbitMQ)
- [x] CI/CD (GitHub Actions)

## 📄 License

MIT

## 🧑‍💻 Author

Made with ❤️ by Neethu Jacob
