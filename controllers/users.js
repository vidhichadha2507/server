import User from "../models/Users.js";

/**
 * @fileoverview Controller function to handle fetching user data.
 */

/**
 * Get a user by ID.
 *
 * @async
 * @function
 * @param {express.Request} req - Express request object containing the user ID in the params.
 * @param {express.Response} res - Express response object used to send the response.
 * @returns {Promise<void>}
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
