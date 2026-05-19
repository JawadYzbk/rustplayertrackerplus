FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat gcompat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client and Build
RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Automatically leverage output traces to reduce image size
# Since we use a custom server (server.ts), we must copy the full .next build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# We need tsx, full node_modules, and source files to run the custom server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# Set default port
ENV PORT 3000
EXPOSE 3000
ENV HOSTNAME "0.0.0.0"

# Use a more resilient startup command. 
# We run prisma push in the background so it doesn't block Render's port detection.
CMD ["sh", "-c", "npx prisma db push --accept-data-loss & npm start"]
