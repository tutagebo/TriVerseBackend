# syntax=docker/dockerfile:1
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV TZ=Asia/Tokyo

# 2) 依存解決 + ビルド（devDepsを含む）
FROM base AS builder
# まず package*.json だけコピーしてインストール（キャッシュ効かせる）
COPY package*.json ./
RUN npm ci
# ソースとtsconfigを後から
COPY tsconfig.json ./
COPY src ./src
# メモリが厳しい環境なら増やす（必要に応じて）
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm run build

# 3) 実行用（prod依存のみ）
FROM base AS runner
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]
