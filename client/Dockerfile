# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy entire monorepo context
COPY . .

# Install all deps
RUN yarn install --frozen-lockfile
# Build the client workspace
RUN yarn workspace recipe-organizer-client build

# Stage 2: Serve with minimal footprint
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/client/.next ./.next
COPY --from=builder /app/client/public ./public
COPY --from=builder /app/client/package.json ./package.json

# Install only prod deps (for `next` binary)
RUN yarn install --production

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]
