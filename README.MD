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

## Features

- **Real-Time Rider Search:** Connects drivers and passengers in real time.
- **Ride Location Tracking:** Continuously updates and tracks ride locations, scaling by using WebSocket and RabbitMQ to increase API performance by 60%.
- **Efficient Communication:** Uses WebSocket for instant notifications and updates for any new ride to valid riders.
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

3. Set up Docker:

   Ensure Docker is installed and running on your machine. Pull the pre-built Docker image and run the container:

   ```bash
   docker pull pruthiraj/ridewave
   docker run -d -p 3005:3005 --name ridewave pruthiraj/ridewave
   ```

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

This will run the server on the configured port, and the application will be accessible at `http://localhost:3005`.

## API Documentation

### 1. User Registration and Authentication

- **POST /api/auth/user/signup:** Register a new user.
  - **Request Data:**
    ```json
    {
      "username": "username",
      "email": "user email",
      "password": "user password",
      "contactNumber": "user contactNumber"
    }
    ```
  - **Success Response Data:**
    ```json
    {
      "status": 200,
      "data": {
        "user": {
          "username": "username",
          "email": "user email",
          "contactNumber": "user contactNumber",
          "_id": "userId"
        }
      }
    }
    ```

- **POST /api/auth/user/login:** Authenticate using JWT token and cookies.
  - **Request Data:**
    ```json
    {
      "email": "user email",
      "password": "user password"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "User login successfully"
      }
    }
    ```

### 2. Rider Registration and Authentication

- **POST /api/auth/rider/register:** Register a new rider.
  - **Request Data:**
    ```json
    {
      "username": "username",
      "email": "user email",
      "password": "user password",
      "contactNumber": "user contactNumber",
      "riderType": "Rider type" // ['auto', 'go', 'moto']
    }
    ```
  - **Success Response Data:**
    ```json
    {
      "status": 200,
      "data": {
        "user": {
          "username": "username",
          "email": "user email",
          "contactNumber": "user contactNumber",
          "_id": "riderId",
          "riderType": "riderType"
        }
      }
    }
    ```

- **POST /api/auth/rider/login:** Authenticate using JWT token and cookies.
  - **Request Data:**
    ```json
    {
      "email": "user email",
      "password": "user password"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "User login successfully"
      }
    }
    ```

### 3. Rider Management

- **POST /api/ride/updatelocation:id?type=type:** Update the location of the rider and broadcast to users.
  - **Request Data:**
    ```json
    {
      "latitude": "location latitude",
      "longitude": "location longitude"
    }
    ```
  - **Parameters:**
    - `id`: Rider ID
    - `type`: Query ['go', 'auto', 'moto']

- **PUT /api/rider/activate:id:** Activate the rider and set location in DB.
  - **Request Data:**
    ```json
    {
      "longitude": "rider longitude",
      "latitude": "rider latitude"
    }
    ```
  - **Parameters:**
    - `id`: Rider ID
    - `type`: Query ['go', 'auto', 'moto']
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Rider activated successfully"
      },
      "error": null
    }
    ```

- **PUT /api/rider/deactivate:id?type=type:** Deactivate rider.
  - **Parameters:**
    - `id`: Rider ID
    - `type`: Rider Type
  - **Response Data:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Rider deactivated successfully"
      },
      "error": null
    }
    ```

### 4. User Ride Management

- **GET /api/userride/findrider?type=type:** Match riders with nearby drivers.
  - **Request Data:**
    ```json
    {
      "source": { "latitude": "latitude", "longitude": "longitude" },
      "destination": { "latitude": "latitude", "longitude": "longitude" }
    }
    ```
  - **Parameters:**
    - `type` (optional): Rider type; default is 'auto'
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "nearRiders": [ /* Array of nearby riders with details */ ],
        "cost": [ /* Array of costs by type */ ],
        "distance": "distance"
      },
      "error": null
    }
    ```

- **GET /api/userride/connectrider?type=type:** Send a request for a new ride to a valid rider.
  - **Request Data:**
    ```json
    {
      "source": { "latitude": "latitude", "longitude": "longitude" },
      "destination": { "latitude": "latitude", "longitude": "longitude" },
      "distance": "distance",
      "nearRiders": [ /* Array of nearby riders */ ]
    }
    ```
  - **Parameters:**
    - `type`: Rider type
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Your request has been sent. Please wait to connect with your rider"
      },
      "error": null
    }
    ```

- **POST /api/userride/acceptride/:id:** Accept a ride if it is in time and in pending state.
  - **Parameters:**
    - `id`: Booking ID
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "newRide": "New ride details"
      },
      "error": null
    }
    ```

- **POST /api/userride/trackride/:id?userId=userId&riderId=riderId:** Track the ride location.
  - **Parameters:**
    - `id`: Booking ID
    - `userId`: User ID
    - `riderId`: Rider ID
  - **Request Data:

**
    ```json
    {
      "longitude": "longitude",
      "latitude": "latitude"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Track successfully"
      },
      "error": null
    }
    ```

- **GET /api/userride/starttracking/:id:** Start tracking an active ride.
  - **Parameters:**
    - `id`: Booking ID
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "newRide": "Updated ride details"
      },
      "error": null
    }
    ```

- **POST /api/userride/startride/:id:** Start the ride by the rider.
  - **Parameters:**
    - `id`: Booking ID
  - **Request Data:**
    ```json
    {
      "otp": "confirmation otp"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Ride started"
      },
      "error": null
    }
    ```

- **POST /api/userride/completeride/:id:** Complete the ride and notify the user.
  - **Parameters:**
    - `id`: Booking ID
  - **Request Data:**
    ```json
    {
      "longitude": "longitude",
      "latitude": "latitude"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Ride completed successfully"
      },
      "error": null
    }
    ```

- **POST /api/userride/ratting/:id?riderId=riderId:** Rate the rider.
  - **Parameters:**
    - `id`: Booking ID
    - `riderId`: Rider ID
  - **Request Data:**
    ```json
    {
      "rating": "rating"
    }
    ```
  - **Success Response:**
    ```json
    {
      "status": 200,
      "data": {
        "message": "Rated successfully"
      },
      "error": null
    }
    ```

## WebSocket Events

### 1. Connection Events

- `connect`: Fired when a client connects.
- `disconnect`: Fired when a client disconnects.

### 2. Rider Events

- `rider_location`: Provides the updated location of the rider.
- `newride`: New ride available for the appropriate rider.
- `TrackRide:${bookingId}`: Tracking of the current ride for the appropriate rider.

### 3. User Events

- `rider_location`: Provides the updated location of the rider.
- `TrackRide:${bookingId}`: Tracking of the current ride for the appropriate user.
- `RideCompletion:${bookingId}`: Notification for ride completion to the user.
- `confirmationRideFromRider`: Notification if any rider accepts the ride.
- `rideRequestTimeout`: Notification if no response from the rider within the time limit.

## Message Queue

RideWave uses RabbitMQ for handling asynchronous tasks such as background processing of ride requests, notifications, and other tasks that can be decoupled from the main request-response cycle. This approach, along with WebSocket integration, increases API response efficiency by 50% under maximum traffic.

## Database Models

- **User:** Stores user details and authentication data.
- **Ride:** Stores ride details, status, and location history.
- **Driver:** Stores driver details and status.
- **Location:** Caches real-time location data using Redis.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.


Feel free to adjust any sections to better fit your specific implementation or additional details.
