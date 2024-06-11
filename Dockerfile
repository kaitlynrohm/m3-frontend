# FROM node:20-alpine3.19

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --include=dev

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]



#Stage 1: Build the React app
FROM node:20-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React app
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]