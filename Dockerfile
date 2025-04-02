# deps
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat 

WORKDIR /app 

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 

# builder
FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env .env

RUN yarn build 

# runner 
FROM node:18-alpine AS runner

WORKDIR /app 

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
