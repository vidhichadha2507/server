import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

dotenv.config();

/**
 * @fileoverview This file sets up the main server application using Express.
 * It configures middleware, routes, and connects to a MongoDB database.
 */

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(helmet());

/**
 * Set security-related HTTP headers using Helmet.
 */
app.use(morgan("common"));

/**
 * Log HTTP requests using Morgan in 'common' format.
 */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/**
 * POST /auth/register
 * @description Register a new user
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.post("/auth/register", register);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 6001;

/**
 * Connect to MongoDB and start the server
 * @returns {void}
 */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    // Uncomment the following lines to insert initial data into the database
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(error.message));
