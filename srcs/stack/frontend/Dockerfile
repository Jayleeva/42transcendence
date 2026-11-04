FROM node:22-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install lucide-react

COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
# remplacer dev par start quand prêt