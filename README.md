# 🍽️ Recipe Organizer

A full-stack app to manage, search, and plan recipes — built with Node.js, TypeScript, MongoDB, JWT Auth, and (soon) React/Next.js.

## 📦 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcrypt
- **API**: REST + OpenAPI (upcoming)
- **Frontend**: [planned] Next.js + React
- **Other**: Redis, RabbitMQ (upcoming), Docker

## ✅ Features (MVP)

- [x] User registration and login
- [x] JWT authentication
- [x] Recipe creation and management
- [x] Public/private toggle
- [x] Search by ingredient/tags
- [ ] Favorite recipes
- [ ] OpenAPI documentation

## 🚀 Getting Started

```bash
cd server
yarn install
cp .env.example .env # Add your MongoDB URI and JWT secret
yarn dev
```

## 📁 Folder Structure

```pgsql
server/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── middlewares/
└── index.ts
```

## 🧪 Tests

The backend is tested using **Jest** with both **unit** and **integration** coverage:

- ✅ **Unit tests** for utilities like `jwt` (token handling) and `slugify`, with comprehensive edge case handling
- ✅ **Middleware tests** for `requireAuth` (JWT verification and route protection)
- ✅ Integration tests using Supertest and a real MongoDB test database (.env.test) to verify all recipe CRUD endpoints, authentication, and access control

```bash
# Run all tests
yarn test


## 📌 Roadmap

Recipe CRUD

Image uploads (Cloudinary)

Meal planner + grocery list

Redis cache for search

Background job (RabbitMQ)

CI/CD (GitHub Actions)

## 🧑‍💻 Author

Made with ❤️ by Neethu Jacob
```
