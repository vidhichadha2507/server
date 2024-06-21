import jwt from "jsonwebtoken";

/**
 * @fileoverview Middleware function to verify JWT tokens.
 */

/**
 * Verify JWT token.
 *
 * @function
 * @param {express.Request} req - Express request object containing the token in the Authorization header.
 * @param {express.Response} res - Express response object used to send a response.
 * @param {express.NextFunction} next - Express next middleware function.
 * @returns {void}
 */
export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
