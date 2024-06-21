import mongoose from "mongoose";

/**
 * @fileoverview Mongoose model for user data.
 */

/**
 * User schema definition.
 *
 * @typedef {Object} User
 * @property {string} firstName - The user's first name. Must be between 3 and 50 characters.
 * @property {string} lastName - The user's last name. Must be between 3 and 50 characters.
 * @property {string} email - The user's email. Must be unique and in lowercase.
 * @property {string} password - The user's hashed password. Must be between 6 and 1024 characters.
 * @property {string} [location] - The user's location.
 * @property {string} [occupation] - The user's occupation.
 * @property {Date} createdAt - The timestamp of when the user was created.
 * @property {Date} updatedAt - The timestamp of when the user was last updated.
 */

// Define the user schema
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
    location: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
