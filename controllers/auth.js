import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

/**
 * @fileoverview Controller functions for user authentication.
 */

/**
 * Register a new user.
 *
 * @async
 * @function
 * @param {express.Request} req - Express request object containing user details in the body.
 * @param {express.Response} res - Express response object used to send a response.
 * @returns {Promise<void>}
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, occupation } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      location,
      occupation,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Log in an existing user.
 *
 * @async
 * @function
 * @param {express.Request} req - Express request object containing email and password in the body.
 * @param {express.Response} res - Express response object used to send a response.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
