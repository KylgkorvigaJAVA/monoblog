# Docker Setup for Monoblog

This project includes Docker support for containerizing all microservices and the React client.

## Services

- **Posts Service** (port 5000): Manages blog posts
- **Comments Service** (port 5001): Manages comments
- **Query Service** (port 5002): Aggregates data for the frontend
- **Moderation Service** (port 5003): Moderates comments
- **Event Bus** (port 5005): Central event broker
- **Client** (port 3000): React frontend

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Build and Run All Services

```bash
docker-compose up --build
```

This will:
1. Build Docker images for all services
2. Start all containers
3. Create a shared network for inter-service communication

### Access the Application

- **Frontend**: http://localhost:3000
- **Posts API**: http://localhost:5000
- **Comments API**: http://localhost:5001
- **Query API**: http://localhost:5002
- **Moderation API**: http://localhost:5003
- **Event Bus**: http://localhost:5005

## Common Commands

### Start services without rebuilding
```bash
docker-compose up
```

### Stop all services
```bash
docker-compose down
```

### View logs from all services
```bash
docker-compose logs -f
```

### View logs from a specific service
```bash
docker-compose logs -f posts
docker-compose logs -f comments
docker-compose logs -f query
docker-compose logs -f moderation
docker-compose logs -f event-bus
docker-compose logs -f client
```

### Rebuild a specific service
```bash
docker-compose up --build posts
```

### Remove all containers and networks
```bash
docker-compose down -v
```

## Environment Variables

The following environment variables are configured in `docker-compose.yml`:

- `EVENT_BUS_URL`: URL for the event bus (default: http://event-bus:5005)
- `POSTS_URL`: URL for the posts service (used by event-bus)
- `COMMENTS_URL`: URL for the comments service (used by event-bus)
- `QUERY_URL`: URL for the query service (used by event-bus)
- `MODERATION_URL`: URL for the moderation service (used by event-bus)

## Architecture

Services communicate through:
1. **Direct HTTP calls**: Frontend calls posts and query services
2. **Event bus**: Services emit events that are forwarded to other services

All services are connected via a shared Docker network (`monoblog-network`), allowing them to communicate using service names (e.g., `http://event-bus:5005`).

## Development

For local development without Docker, you can run services individually:

```bash
# Terminal 1
cd event-bus && npm install && npm start

# Terminal 2
cd posts && npm install && npm start

# Terminal 3
cd comments && npm install && npm start

# Terminal 4
cd query && npm install && npm start

# Terminal 5
cd moderation && npm install && npm start

# Terminal 6
cd client && npm install && npm start
```

Make sure to set the `EVENT_BUS_URL` environment variable appropriately or edit the hardcoded localhost URLs in the service files.
