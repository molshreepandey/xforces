FROM oven/bun:latest AS base
WORKDIR /app
RUN bun add -g turbo


FROM base AS manager
WORKDIR /app
COPY . .
RUN  turbo prune engine --docker

FROM base AS installer
WORKDIR /app
COPY --from=manager /app/out/bun.lock* ./
COPY --from=manager /app/out/full/ ./
COPY --from=manager /app/out/json/ ./
# COPY --from=manager /app/turbo.json ./
RUN bun install

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ ./
RUN bun run build

FROM node:20.10.0-alpine AS final
WORKDIR /app
COPY --from=builder /app/apps/engine/dist ./apps/engine/dist
COPY --from=builder /app/apps/engine/node_modules ./apps/engine/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/engine/package.json ./apps/engine/package.json
CMD ["npm","run","start"]
