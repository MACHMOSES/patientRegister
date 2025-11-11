# -----------------------------
# BACKEND DOCKERFILE
# -----------------------------
FROM maven:3.9.11-eclipse-temurin-21-alpine AS build
WORKDIR /workspace

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Build the backend (skip tests for speed)
RUN mvn -DskipTests package

# Production runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy built JAR
COPY --from=build /workspace/target/patientRegister-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
