import express from "express";
import { getUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @fileoverview Routes for user-related endpoints.
 */

/**
 * GET /:id
 * @summary Get a user by ID.
 * @description Endpoint to retrieve a user's data by their ID. Requires token verification.
 * @route {GET} /:id
 * @param {express.Request} req - Express request object containing the user ID in the params.
 * @param {express.Response} res - Express response object used to send the response.
 * @param {express.NextFunction} next - Express next middleware function.
 */
router.get("/:id", verifyToken, getUser);

export default router;
