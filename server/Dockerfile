# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all monorepo files (at once, no ../../)
COPY . .

# Install deps and build
RUN yarn install --frozen-lockfile
RUN yarn workspace recipe-organizer-server build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy built files and only needed deps
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]