# Docker Setup Guide for NewsPortal

This guide provides comprehensive instructions for setting up and using Docker with the NewsPortal project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Docker Compose](#docker-compose)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (version 1.29 or higher)
- At least 4GB RAM allocated to Docker
- 2GB free disk space

## Quick Start

### 1. Build the Docker image

```bash
docker build -t newsportal .
```

### 2. Run the container

```bash
docker run -p 3000:3000 -d newsportal
```

### 3. Access the application

Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

## Development Setup

For development, we recommend using Docker Compose for easier management:

### 1. Start development environment

```bash
docker-compose up --build
```

This will:

- Build the development image
- Start the Next.js development server
- Mount your local files for live reloading
- Map port 3000

### 2. Access development server

The application will be available at: [http://localhost:3000](http://localhost:3000)

### 3. Stop development environment

```bash
docker-compose down
```

## Production Deployment

### 1. Build production image

```bash
docker build -t newsportal:production --target runner .
```

### 2. Run production container

```bash
docker run -p 3000:3000 -d --env NODE_ENV=production newsportal:production
```

### 3. Environment variables

You can pass environment variables to the container:

```bash
docker run -p 3000:3000 -d \
  --env NODE_ENV=production \
  --env NEXT_PUBLIC_API_URL=/api \
  newsportal:production
```

## Docker Compose

The project includes a `docker-compose.yml` file for easier management:

### Development mode

```bash
docker-compose up --build
```

### Production mode

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## Dockerfile Explanation

The Dockerfile uses a multi-stage build:

1. **Builder stage**: Installs dependencies and builds the application
2. **Runner stage**: Contains only production-ready files

### Key features:

- Uses Node.js 18 Alpine image (lightweight)
- Multi-stage build for smaller final image
- Proper layer caching for faster rebuilds
- Production-optimized configuration

## Troubleshooting

### Common issues and solutions:

**Issue: Port already in use**

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: Change the host port mapping or stop the conflicting service:

```bash
docker run -p 3001:3000 -d newsportal
```

**Issue: Container exits immediately**

```bash
Container exited with code 1
```

**Solution**: Check logs and ensure all dependencies are installed:

```bash
docker logs <container_id>
docker-compose build --no-cache
```

**Issue: File changes not reflected**

```bash
Changes to local files don't appear in container
```

**Solution**: Ensure volumes are properly mounted and restart:

```bash
docker-compose down && docker-compose up --build
```

## Advanced Configuration

### Custom Dockerfile

To customize the Docker build, create a `Dockerfile.dev`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### Multiple containers

For a full stack setup, extend the `docker-compose.yml`:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://newsportal:newsportal123@postgres:5432/newsportal_db

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: newsportal
      POSTGRES_PASSWORD: newsportal123
      POSTGRES_DB: newsportal_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Best Practices

1. **Use `.dockerignore`**: Always maintain an up-to-date `.dockerignore` file
2. **Layer caching**: Order Dockerfile commands to maximize cache usage
3. **Small images**: Use multi-stage builds to keep production images small
4. **Security**: Regularly update base images and scan for vulnerabilities
5. **Environment variables**: Use `.env` files for sensitive configuration

## Cleanup

To clean up Docker resources:

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused objects
docker system prune
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
