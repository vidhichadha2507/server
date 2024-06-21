import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

/**
 * @fileoverview Routes for authentication-related endpoints.
 */

/**
 * POST /login
 * @summary Log in a user.
 * @description Endpoint to log in a user with email and password.
 * @route {POST} /login
 * @param {express.Request} req - Express request object containing email and password in the body.
 * @param {express.Response} res - Express response object used to send the response.
 */
router.post("/login", login);

export default router;
