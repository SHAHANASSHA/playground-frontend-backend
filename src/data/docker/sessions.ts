const sessions: { head: string, body: string[] } = {
   head: `---
title: "Docker 101"
author: "Jyothish N P"
categories: ["Training", "Docker"]
tags: ["docker", "containers", "training"]
---`,
   body: [
      `

### 📝 **Agenda**

1. **Introduction to Containers & Docker**
2. **Docker Architecture**
3. **Working with Docker Images**
4. **Managing Containers**
5. **Networking & Volumes**
6. **Basic Docker Compose**
8. **Q&A Session**

---

## 🎯 **Learning Outcomes**

By the end of this session, you will be able to:

- ✅ Understand Docker and it's architecture. 
- ✅ Pull, build, and manage Docker images
- ✅ Run and manage Docker containers
- ✅ Use Docker networking and volumes
- ✅ Write a basic \`docker-compose.yml\`

---

## 🙌 **Let's Have a Great Session!**

**Jyothish N P**  
**Synnefo Solutions**

---
`,
      `

## 📝 What is Container

- Lightweight, portable software unit
- Packages application and dependencies
- Isolated from other applications
- Shares host OS kernel
- Runs consistently across environments

---

## ✅ Why Containers

- Consistent across dev, test, prod
- Fast startup and deployment
- Lower resource usage than VMs
- Easy to scale and manage
- Application isolation without full VM

---

## 🐳 What is Docker

- Platform to build, run, and manage containers
- Provides CLI and APIs for container operations
- Uses Docker images to create containers

---

## 🚀 Why Docker

- Simplifies container creation and deployment
- Access to Docker Hub for pre-built images
- Enables portability across systems
- Integrates with orchestration tools

`,
      `
---
title:  Docker Architecture
---

Docker uses a client-server architecture consisting of three main components:

1. **Docker Client**: The command-line interface (CLI) that users interact with
2. **Docker Host**: The server running the Docker daemon (dockerd)
3. **Docker Registry**: The storage location for Docker images

![Docker Architecture](https://cdn.prod.website-files.com/667db86cfee88934419c207a/66fdaea48c5da47d9f4bca52_66fdae9fcd8243eb5249bacf_Docker%2520Daemon%2520Architecture%2520-%2520Diagram%25202.png)

## Core Components

### Docker Daemon (dockerd)
- Manages Docker objects (images, containers, networks, volumes)
- Listens for Docker API requests
- Handles communication between components

### Docker Client (docker)
- Primary way users interact with Docker
- Sends commands to dockerd
- Can communicate with multiple Docker hosts

### Docker Registry
- Stores Docker images
- Docker Hub is the default public registry
- Organizations often maintain private registries

### Docker Images

Images are the building blocks of containers:

- Read-only templates
- Contains layers of filesystem changes
- Defined by a Dockerfile
- Can be shared and reused

### Image Naming Convention
\`\`\`
[registry-host:port]/[username]/repository:tag
\`\`\`
Examples:
- \`nginx:latest\`
- \`docker.io/mysql:8.0\`
- \`registry.internal.company.com/app:v1.2.3\`

### Basic Image Commands
\`\`\`bash
# List local images
docker images

# Pull an image
docker pull nginx:latest

# View image details
docker inspect nginx:latest

# Remove an image
docker rmi nginx:latest
\`\`\`

### Best Practices

1. **Image Management**
   - Use specific image tags instead of \`latest\`
   - Regularly clean unused images
   - Implement image scanning in your workflow

2. **Registry Usage**
   - Use private registries for proprietary code
   - Implement access controls
   - Regular cleanup of unused images

3. **Security**
   - Use official base images
   - Keep base images updated
   - Scan images for vulnerabilities

`,
      `

## 📝 Docker Images

- Read-only template for containers
- Built from a set of instructions (Dockerfile)
- Can be shared via Docker Hub
- Used to create one or multiple containers

---

## 🔍 Basic Commands

\`\`\`bash
# Download image
docker pull <image>

# List images
docker images

# Remove image
docker rmi <image>

# Build image from Dockerfile
docker build -t <name> .

# Tag an image
docker tag <src> <dest>
\`\`\`

`,
      `
---
title: Container Lifecycle Management
---

## Container States

A Docker container can exist in one of these states:
- **Created**: Container is created but not started
- **Running**: Container is executing
- **Paused**: Container execution is paused
- **Stopped**: Container is stopped but exists
- **Deleted**: Container is removed

## Basic Lifecycle Commands

### Creating and Starting

\`\`\`bash
# Create a container without starting it
docker create --name myapp nginx

# Start the container
docker start myapp

# Create and start in one command
docker run --name myapp -d nginx
\`\`\`

### Monitoring State

\`\`\`bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Container details
docker inspect myapp
\`\`\`

### Pausing and Unpausing

\`\`\`bash
# Pause a running container
docker pause myapp

# Resume a paused container
docker unpause myapp
\`\`\`

### Stopping and Starting

\`\`\`bash
# Stop a container (SIGTERM)
docker stop myapp

# Force stop (SIGKILL)
docker kill myapp

# Restart a container
docker restart myapp
\`\`\`

### Removing Containers

\`\`\`bash
# Remove a stopped container
docker rm myapp

# Force remove a running container
docker rm -f myapp
\`\`\`

## Container States Diagram

\`\`\`bash
Created → Running → Stopped → Deleted
           ↑   ↓
           Paused
\`\`\`

## Best Practices

1. Always use meaningful container names
2. Clean up stopped containers regularly
3. Use \`-d\` flag for background processes
4. Set restart policies for production containers
5. Use \`docker stop\` instead of \`docker kill\`

`,
      `
\`\`\`examiner:execute-test
name: docker1
title: Verify that Docker is installed
timeout: 15
retries: .INF
delay: 1
autostart: true
cascade: true
\`\`\`

\`\`\`examiner:execute-test
name: docker2
title: Verify that web01 is running
args:
- web01
retries: .INF
delay: 1
\`\`\`

`]
}

export default sessions;