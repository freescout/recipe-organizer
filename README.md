# 🍽️ Recipe Organizer

A full-stack monorepo app to manage, search, and plan recipes — built with Node.js, TypeScript, MongoDB, JWT Auth, and React/Next.js.
The project uses Yarn Workspaces and Docker Compose for easy local and production setup.

## 📋 Prerequisites

- Node.js 18+ and Yarn
- Docker & Docker Compose (for containerized setup)
- Git

## 📦 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: Next.js + React
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt
- **API**: REST + OpenAPI
- **DevOps**: Docker, Docker Compose
- **Other**: Redis, RabbitMQ (upcoming)

## 🗂️ Monorepo Structure

```bash
server/        # Node.js + Express + TypeScript backend
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── middlewares/
└── index.ts

client/        # Next.js + React frontend
├── app/
├── components/
├── pages/
└── package.json

```

Root:

```bash
├── docker-compose.yml
├── package.json            # yarn workspaces config
├── .env                    # shared environment vars
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

### Option A : Docker Compose (Recommended)

Easiest setup - handles MongoDB, server, and client all at once

```bash
# Copy example env file
cp server/.env.example server/.env

# Start all services
docker compose up --build
# Add your MongoDB URI and JWT secret
```

This will start:

- Server: http://localhost:7000

- Client: http://localhost:3000

- MongoDB: localhost:27017 (with persistent volume)

Your server/.env should look like:

```env
MONGODB_URI=mongodb://mongo:27017/recipe-organizer
JWT_SECRET=your-super-secret-key-change-this-in-production
PORT=7000
NODE_ENV=development
```

### Option B - Local development (without Docker)

Better for development - faster hot reload and easier debugging.

Step 1: Install and start MongoDB locally

```bash
# macOS (via Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt install mongodb
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
```

Step 2: Configure environment

```bash
cp server/.env.example server/.env
```

Edit server/.env

```env
MONGODB_URI=mongodb://localhost:27017/recipe-organizer
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

3. Verify Setup

- Client: http://localhost:3000 (local) or http://localhost:3001 (Docker)
- Server: http://localhost:7000/api
- API Docs: http://localhost:7000/api/docs (if OpenAPI/Swagger is configured)

## 🧪 Tests

The backend uses **Jest** for both **unit** and **integration** tests:

- ✅ **Unit tests** for utilities like `jwt` (token handling) and `slugify`, with comprehensive edge case handling
- ✅ **Middleware tests** for `requireAuth` (JWT verification and route protection)
- ✅ Integration tests using Supertest and a real MongoDB test database (.env.test) to verify all recipe CRUD endpoints, authentication, and access control

```bash
# Run all tests
yarn workspace recipe-organizer-server test

```

## 🔧 Dev Scripts

Quick helper scripts for backend testing or seeding:

```bash
# Seed a test user
yarn workspace recipe-organizer-server ts-node scripts/seed-user.ts

# Generate a JWT for curl testing
yarn workspace recipe-organizer-server ts-node scripts/print-token.ts

```

---

## 🧪 Testing with CURL

✅ Prerequisites

1. Create a user and get its ID

```bash
yarn workspace recipe-organizer-server ts-node scripts/seed-user.ts  // USER ID: 684c475048c20d02be2eea6a
```

2. Generate JWT token

```js
yarn workspace recipe-organizer-server ts-node scripts/print-token.ts
```

3. Store credentials in shell variables

```bash
export TOKEN="<your-jwt-token>"
export USER_ID="<user_id from script>"
```

### 🔍 Test Routes with `curl`

Here’s a sequence of sample `curl` commands (replace ports or paths if different):

#### 1. 🆓 Public routes (no token needed)

```bash
curl http://localhost:7000/api/recipes/public
curl http://localhost:7000/api/recipes/slug/avocado-toast

```

### 2. 🔐 Protected route: Get user profile or favorites

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:7000/api/recipes/favorites
```

### 3. ➕ Create a new recipe (POST)

```bash
curl -X POST http://localhost:7000/api/recipes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "Rice Pilaf",
        "ingredients": ["rice", "salt"],
        "instructions": "Boil water. Add rice.",
        "prepTime": 5,
        "cookTime": 15,
        "servings": 2,
        "tags": ["easy", "vegan"]
      }'

```

### 4. ❤️ Add/remove favorite

```bash
curl -X POST http://localhost:7000/api/recipes/$USER_ID/favorite \
  -H "Authorization: Bearer $TOKEN"

curl -X DELETE http://localhost:7000/api/recipes/$USER_ID/favorite \
  -H "Authorization: Bearer $TOKEN"

```

### 5. 🔄 Update recipe (PUT)

```bash
curl -X PUT http://localhost:7000/api/recipes/68502e9413d75028b2311213 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Turkish Rice"}'
```

### 6. 🗑️ Delete recipe

```bash
curl -X DELETE http://localhost:7000/api/recipes/68502e9413d75028b2311213 \
  -H "Authorization: Bearer $TOKEN"
```

## 🌐 Live Demo

The application is deployed and running at:

- Client: https://recipe-organizer-client.vercel.app
- API: https://recipe-organizer-server.onrender.com/api

## 📌 Roadmap

- [x] User authentication (JWT + bcrypt)
- [x] Recipe CRUD
- [x] Production deployment
- [ ] Image uploads (Cloudinary)
- [ ] Meal planner + grocery list
- [ ] Redis cache for search
- [ ] Background jobs (RabbitMQ)
- [ ] CI/CD (GitHub Actions)

📄 License
MIT

## 🧑‍💻 Author

Made with ❤️ by Neethu Jacob
