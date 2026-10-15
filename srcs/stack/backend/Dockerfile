FROM node:22-alpine AS builder
RUN apk add --no-cache openssl
#WORKDIR /framework
COPY /package.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build

FROM node:22-alpine
RUN apk add --no-cache openssl
#WORKDIR /framework
COPY --from=builder /framework ./
EXPOSE 3000
CMD npx prisma migrate deploy && node dist/main.js
