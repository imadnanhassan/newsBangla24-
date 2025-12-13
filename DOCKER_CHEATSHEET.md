# Docker Cheat Sheet for NewsPortal

## 🚀 Quick Commands

### Development

```bash
# Start development environment
docker-compose up --build

# Start in detached mode
docker-compose up -d --build

# Stop development environment
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose down && docker-compose up --build
```

### Production

```bash
# Build production image
docker build -t newsportal:production --target runner .

# Run production container
docker run -p 3000:3000 -d --env NODE_ENV=production newsportal:production

# Run with custom port
docker run -p 8080:3000 -d newsportal:production
```

### Quick Start

```bash
# Build and run (development)
docker build -t newsportal .
docker run -p 3000:3000 -d newsportal

# Access container shell
docker exec -it <container_id> sh
```

## 📋 Common Operations

### Container Management

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>

# Remove all stopped containers
docker container prune
```

### Image Management

```bash
# List images
docker images

# Remove an image
docker rmi <image_id>

# Remove unused images
docker image prune
```

### System Cleanup

```bash
# Remove all unused objects
docker system prune

# Remove all unused objects including volumes
docker system prune -a --volumes
```

## 🔧 Troubleshooting

### Port Conflicts

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Logs and Debugging

```bash
# View container logs
docker logs <container_id>

# Follow logs in real-time
docker logs -f <container_id>

# Inspect container
docker inspect <container_id>
```

### Environment Variables

```bash
# Set environment variables
docker run -e NODE_ENV=development -e PORT=3000 newsportal

# Use .env file
docker run --env-file .env newsportal
```

## 📁 File Structure

```
newsportal/
├── .dockerignore       # Files to ignore in Docker build
├── Dockerfile          # Docker build instructions
├── docker-compose.yml  # Docker Compose configuration
├── DOCKER_GUIDE.md     # Comprehensive Docker guide
└── DOCKER_CHEATSHEET.md # This file
```

## 🔗 Useful Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment#docker-image)
- [Alpine Linux Packages](https://pkgs.alpinelinux.org/packages)

## 💡 Tips

1. **Use volumes for development**: Mount your source code for live reloading
2. **Multi-stage builds**: Keep production images small and secure
3. **Layer caching**: Order Dockerfile commands to maximize cache hits
4. **Health checks**: Add health checks for production containers
5. **Resource limits**: Set memory and CPU limits for production containers
