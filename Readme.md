# Authentication Assignment

This project demonstrates a basic authentication system using Node.js, Express, and MongoDB. It includes user registration, login, and user data retrieval, with token-based authentication.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)
7. [Environment Variables](#environment-variables)
8. [Models](#models)
9. [Controllers](#controllers)
10. [Middleware](#middleware)
11. [Routes](#routes)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/authentication-assignment.git
   cd authentication-assignment
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables) section).

## Running the Application

1. Start MongoDB if running locally.
2. Run the application:

   ```sh
   npm start
   ```

   The server will start on the port specified in the `.env` file or default to `6001`.

## API Endpoints

### POST /auth/register

Registers a new user.

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body Parameters**:
  - `firstName` (string): User's first name.
  - `lastName` (string): User's last name.
  - `email` (string): User's email.
  - `password` (string): User's password.
  - `location` (string, optional): User's location.
  - `occupation` (string, optional): User's occupation.
- **Response**:
  - `201 Created`: Returns the created user object.
  - `500 Internal Server Error`: Returns an error message.

### POST /auth/login

Logs in an existing user.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - `200 OK`: Returns the user object and JWT token.
  - `400 Bad Request`: Returns an error message if credentials are invalid.
  - `500 Internal Server Error`: Returns an error message.

### GET /users/:id

Retrieves a user's data by their ID. Requires token verification.

- **URL**: `/users/:id`
- **Method**: `GET`
- **Headers**:
  - `Authorization` (string): Bearer token.
- **Response**:
  - `200 OK`: Returns the user object.
  - `401 Unauthorized`: Returns an error message if token is invalid.
  - `404 Not Found`: Returns an error message if user is not found.

## Project Structure

```
.
├── controllers
│   ├── auth.js
│   └── users.js
├── middleware
│   └── auth.js
├── models
│   └── Users.js
├── routes
│   ├── auth.js
│   └── users.js
├── .env
├── package.json
└── server.js
```

- `controllers/`: Contains the logic for handling requests.
- `middleware/`: Contains middleware functions.
- `models/`: Contains Mongoose models.
- `routes/`: Contains route definitions.
- `server.js`: Entry point for the application.
- `.env`: Environment variables.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=6001
MONGO_URL=mongodb://localhost:27017/your-database
JWT_SECRET=your_jwt_secret
```

- `PORT`: The port number on which the server will run.
- `MONGO_URL`: The URL of the MongoDB instance.
- `JWT_SECRET`: The secret key for JWT token generation.

## Models

### User Model

Defined in `models/Users.js`:

```js
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 1024,
    },
    location: { type: String, trim: true },
    occupation: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
```

## Controllers

### Auth Controller

Defined in `controllers/auth.js`:

#### register

Registers a new user.

```js
export const register = async (req, res) => {
  // Implementation here
};
```

#### login

Logs in an existing user.

```js
export const login = async (req, res) => {
  // Implementation here
};
```

### User Controller

Defined in `controllers/users.js`:

#### getUser

Retrieves a user's data by their ID.

```js
export const getUser = async (req, res) => {
  // Implementation here
};
```

## Middleware

### Auth Middleware

Defined in `middleware/auth.js`:

#### verifyToken

Verifies the JWT token.

```js
export const verifyToken = (req, res, next) => {
  // Implementation here
};
```

## Routes

### Auth Routes

Defined in `routes/auth.js`:

```js
import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

export default router;
```

### User Routes

Defined in `routes/users.js`:

```js
import express from "express";
import { getUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);

export default router;
```
