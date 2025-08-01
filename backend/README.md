
# Addis Music App - Backend

This is the backend server for the Addis Music App, built with Node.js, Express, and MongoDB. It provides a RESTful API for managing songs, users, and application data.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)

## Features

-   **RESTful API**: Provides a complete set of endpoints for song and user management.
-   **MongoDB Integration**: Uses Mongoose to connect to a MongoDB database for persistent data storage.
-   **Environment-based Configuration**: Uses `.env` files for easy configuration of database connections and other settings.
-   **Modular Structure**: Organized into controllers, routes, and models for better maintainability.

## Technologies

-   **Node.js**: JavaScript runtime environment.
-   **Express**: Web framework for Node.js.
-   **MongoDB**: NoSQL database for data storage.
-   **Mongoose**: ODM for MongoDB.
-   **dotenv**: For managing environment variables.
-   **nodemon**: For automatic server restarts during development.

## Prerequisites

-   Node.js (v14 or later)
-   npm (v6 or later)
-   MongoDB Atlas account or a local MongoDB instance.

## Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Meargteame/addis-music-app.git
    cd addis-music-app/backend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_connection_string
    ```

## Running the Server

-   **Development Mode**:

    To run the server in development mode with automatic restarts, use:

    ```bash
    npm run dev
    ```

-   **Production Mode**:

    To run the server in production mode, use:

    ```bash
    npm start
    ```

The server will start on port `5050` by default.

## API Endpoints

### Songs

-   `GET /api/songs`: Get all songs.
-   `GET /api/songs/:id`: Get a single song by ID.
-   `POST /api/songs`: Create a new song.
-   `PUT /api/songs/:id`: Update a song by ID.
-   `DELETE /api/songs/:id`: Delete a song by ID.

### User

-   `GET /api/user`: Get user profile information.

### Stats

-   `GET /api/stats`: Get application statistics.

### Genres

-   `GET /api/genres`: Get a list of available genres.
