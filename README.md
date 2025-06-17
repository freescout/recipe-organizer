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
- [x] Favorite recipes
- [x] OpenAPI documentation

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
```

## 🔧 Dev Scripts

To help test your API quickly:

```bash
# Seed a test user
yarn ts-node scripts/seed-user.ts

# Generate a JWT token for curl testing
yarn ts-node scripts/print-token.ts
```

---

## 🧪 Testing with CURL

✅ Prerequisites

1. Run your `scripts/seed-user.ts` script:

```js
yarn ts-node scripts/seed-user.ts  // USER ID: 684c475048c20d02be2eea6a
```

2. Then run your `scripts/print-token.ts` script:

```js
yarn ts-node scripts/print-token.ts
```

3. Store the token in a shell variable

```bash
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
```

### 🔍 Test Routes with `curl`

Here’s a sequence of sample `curl` commands (replace ports or paths if different):

#### 1. 🆓 Public routes (no token needed)

```bash
curl http://localhost:7000/api/recipes/public
curl http://localhost:7000/api/recipes/slug/avocado-toast

```

2. 🔐 Protected route: Get user profile or favorites

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:7000/api/recipes/favorites
```

3. ➕ Create a new recipe (POST)

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

4. ❤️ Add/remove favorite

```bash
curl -X POST http://localhost:7000/api/recipes/684c475048c20d02be2eea6a/favorite \
  -H "Authorization: Bearer $TOKEN"

curl -X DELETE http://localhost:7000/api/recipes/684c475048c20d02be2eea6a/favorite \
  -H "Authorization: Bearer $TOKEN"

```

5. 🔄 Update recipe (PUT)

```bash
curl -X PUT http://localhost:7000/api/recipes/68502e9413d75028b2311213 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Turkish Rice"}'
```

6. 🗑️ Delete recipe

```bash
curl -X DELETE http://localhost:7000/api/recipes/68502e9413d75028b2311213 \
  -H "Authorization: Bearer $TOKEN"
```

## 📌 Roadmap

Recipe CRUD

Image uploads (Cloudinary)

Meal planner + grocery list

Redis cache for search

Background job (RabbitMQ)

CI/CD (GitHub Actions)

## 🧑‍💻 Author

Made with ❤️ by Neethu Jacob
