FROM oven/bun:alpine AS base

FROM base AS optimizer
WORKDIR /app
RUN bun add -g  turbo

FROM optimizer AS manager
WORKDIR /app
COPY . .
RUN turbo prune xforces --docker

FROM base AS installer
WORKDIR /app
COPY --from=manager /app/out/full/ .
COPY --from=manager /app/out/bun.lock* .
RUN bun install

FROM base AS build
WORKDIR /app
COPY --from=installer /app/ ./
ARG DATABASE_URL
RUN DATABASE_URL=$DATABASE_URL bun run build --filter=xforces


FROM oven/bun:alpine AS final
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/xforces/node_modules ./apps/xforces/node_modules
COPY --from=build /app/apps/xforces/.next ./apps/xforces/.next
COPY --from=build /app/apps/xforces/public ./apps/xforces/public
COPY --from=build /app/apps/xforces/package.json ./apps/xforces/package.json
COPY --from=build /app/apps/xforces/next.config.ts ./apps/xforces/next.config.ts
WORKDIR /app/apps/xforces
EXPOSE 3002
CMD ["bun", "start"]
