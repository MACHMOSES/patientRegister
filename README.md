# PatientRegister

Small Spring Boot + React patient registry. Frontend is built into the backend static resources during the Docker build.

## Requirements
- Docker & Docker Compose
- (Optional, local dev) Node 20+, npm, Java 21, Maven

## Quick start (Docker)
From project root:
```bash
# build and run, remove orphans, detached
docker-compose build # to build the project
docker-compose up --build --remove-orphans -d

# follow backend logs
docker-compose logs -f backend