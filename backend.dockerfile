# -----------------------------
# BACKEND DOCKERFILE
# -----------------------------
# Stage 1: Build the frontend (React app)
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
# Copy frontend files and other files to this image

COPY frontend/package.json ./


RUN npm install

COPY frontend/ ./

RUN npm run build  
# Stage 2: Build the backend (Spring Boot) and integrate frontend
FROM maven:3.9.11-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app
# Copy Maven files
COPY pom.xml .
COPY src ./src
# Copy frontend build output to Spring Boot's static folder
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static/build

# Now build the backend
RUN mvn clean package -DskipTests 

# Stage 3: Production runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copy the built JAR from the backend-build stage
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080 
ENTRYPOINT ["java", "-jar", "app.jar"]