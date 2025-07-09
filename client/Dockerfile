# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy monorepo files
COPY package.json yarn.lock ./
COPY client ./client

# Install all deps
RUN yarn install --frozen-lockfile

# Build the client workspace
RUN yarn workspace recipe-organizer-client build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy only necessary built assets
COPY --from=builder /app/client/public ./public
COPY --from=builder /app/client/.next ./.next
COPY --from=builder /app/client/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set production env
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "workspace", "recipe-organizer-client", "start"]