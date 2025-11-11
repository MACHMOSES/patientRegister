# -----------------------------
# FRONTEND DOCKERFILE
# -----------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make bash

# Copy only frontend-related files
COPY package.json package-lock.json* ./
COPY src ./src
COPY frontend ./frontend
COPY webpack.config.js ./ 
# Install dependencies and build
RUN npm install
RUN npm run build 

# Serve static files with Nginx (optional)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]