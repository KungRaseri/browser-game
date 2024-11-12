FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

FROM base AS builder
ENV DOCKER_CI true
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 svelte

COPY --from=deps --chown=svelte:nodejs /app/package.json /app/package-lock.json* ./
COPY --from=deps --chown=svelte:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=svelte:nodejs /app/static ./static

COPY --from=builder --chown=svelte:nodejs /app/build ./
COPY --from=builder --chown=svelte:nodejs /app/.env.docker ./.env

USER svelte

EXPOSE 4000

CMD [ "node", "." ]