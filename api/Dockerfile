# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder
WORKDIR /app

# Git とビルドツールを追加（git依存やネイティブ拡張対策）
RUN apk add --no-cache git python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx tsc

FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache git
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]
