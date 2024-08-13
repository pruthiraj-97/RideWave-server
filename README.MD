
# RideWave

RideWave is a powerful and scalable backend solution for ride-hailing services similar to Uber. It provides real-time features such as rider search, ride location updates, and efficient communication between drivers and passengers. Built with a modern tech stack, RideWave ensures high performance, reliability, and scalability.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [WebSocket Events](#websocket-events)
- [Message Queue](#message-queue)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Rider Search:** Connects drivers and passengers in real time.
- **Ride Location Tracking:** Continuously updates and tracks ride locations scale by using webSocket and RabbitMQ increass the API     performance by 60%.
- **Efficient Communication:** Uses WebSocket for instant notifications and updates for any new Ride to valid Rider.
- **Scalability:** Designed to handle high loads with Redis, RabbitMQ, and efficient database management.
- **Secure and Reliable:** Ensures secure data transmission and storage.

## Tech Stack

- **Node.js:** Backend runtime environment.
- **Express.js:** Web framework for building RESTful APIs.
- **MongoDB:** NoSQL database for data storage.
- **Redis:** In-memory data store for caching and tracking rider locations.
- **RabbitMQ:** Message broker for handling asynchronous tasks and communication.
- **Socket.io:** WebSocket library for real-time communication.
- **Docker:** Containerization for easy deployment.

## Architecture Overview

RideWave is structured to handle high traffic and real-time operations. Here’s an overview of the architecture:

- **API Layer:** Built with Express.js, providing RESTful APIs for all ride-related operations.
- **WebSocket Layer:** Manages real-time communication between the server and clients using Socket.io.
- **Data Layer:** MongoDB stores persistent data, Redis caches data and tracks live locations, and RabbitMQ manages background tasks and message queues.
- **Containerization:** Docker is used to containerize the application for consistent development and deployment environments.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pruthiraj-97/RideWave-server
   cd RideWave-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```


3. Set up Docker

Ensure Docker is installed and running on your machine. Pull the pre-built Docker image and run the container:

```bash
docker pull pruthiraj/ridewave
docker run -d -p 3005:3005 --name ridewave pruthiraj/ridewave
```

This will pull the Docker image from Docker Hub and run the application, exposing it on the configured ports.
This will pull the Docker image from Docker Hub and run the application, exposing it on the configured ports.

4. Start the development server:

   ```bash
   npm start
   ```


## Usage

To start the application:

```bash
npm start
```

This will run the server on the configured port, and the application will be accessible at `http://localhost:5000`.

## API Documentation

### 1. **User Registration and Authentication**

- **POST /api/register:** Register a new user.
- **POST /api/login:** Authenticate and return a JWT token.

### 2. **Ride Management**

- **POST /api/rides:** Create a new ride request.
- **GET /api/rides/:id:** Get ride details by ID.
- **PATCH /api/rides/:id:** Update ride status.

### 3. **Location Updates**

- **POST /api/rides/:id/location:** Update ride location in real time.

### 4. **Driver and Rider Matching**

- **POST /api/match:** Match riders with nearby drivers.

## WebSocket Events

### 1. **Connection Events**

- `connect`: Fired when a client connects.
- `disconnect`: Fired when a client disconnects.

### 2. **Ride Events**

- `ride:request`: Initiate a ride request.
- `ride:update`: Update ride status and location.
- `ride:complete`: Mark a ride as completed.

## Message Queue

RideWave uses RabbitMQ for handling asynchronous tasks such as background processing of ride requests, notifications, and other tasks that can be decoupled from the main request-response cycle.

## Database Models

- **User:** Stores user details and authentication data.
- **Ride:** Stores ride details, status, and location history.
- **Driver:** Stores driver details and status.
- **Location:** Caches real-time location data using Redis.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

---

Feel free to customize the sections based on your specific implementation details!