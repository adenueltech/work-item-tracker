# Multi-stage build for frontend and backend

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json frontend/pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN pnpm build

# Stage 2: Build backend
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY backend/ ./

# Build backend
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine AS production

# Install PostgreSQL client for database operations
RUN apk add --no-cache postgresql-client

# Create app directory
WORKDIR /app

# Copy built frontend
COPY --from=frontend-build /app/frontend/.next /app/frontend/.next
COPY --from=frontend-build /app/frontend/public /app/frontend/public
COPY --from=frontend-build /app/frontend/package*.json /app/frontend/
COPY --from=frontend-build /app/frontend/next.config.mjs /app/frontend/

# Copy built backend
COPY --from=backend-build /app/backend/dist /app/backend/dist
COPY --from=backend-build /app/backend/package*.json /app/backend/
COPY --from=backend-build /app/backend/prisma /app/backend/prisma
COPY --from=backend-build /app/backend/.env /app/backend/

# Install production dependencies for both
WORKDIR /app/frontend
RUN npm install --production

WORKDIR /app/backend
RUN npm install --production

# Generate Prisma client
RUN npx prisma generate

# Expose ports
EXPOSE 3000 3001

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/backend && npx prisma migrate deploy && cd /app && npm start &' >> /app/start.sh && \
    echo 'cd /app/frontend && npm start' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start both services
CMD ["/app/start.sh"]