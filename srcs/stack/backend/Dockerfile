FROM node:22-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /framework

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build

FROM node:22-alpine
RUN apk add --no-cache openssl
WORKDIR /framework

COPY --from=builder /framework ./

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 8000
CMD ["./docker-entrypoint.sh"]