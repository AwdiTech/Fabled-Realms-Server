/**
 * Schema for user data.
 * @module models/userModel
 * @requires mongoose
 * @requires bcrypt
 * @requires validator/lib/isEmail
 */

import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

/**
 * User schema definition. Contains the following fields: username, email, createdAt, password, game, emailVerified, verificationToken.
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
    /**
     * Unique username for the user.
     */
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    /**
     * User's email address. Must be unique and valid.
     */
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please provide a valid email address"],
    },
    /**
     * Date and time when the user was created.
     */
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    /**
     * User's hashed password.
     */
    password: {
        type: String,
        required: true,
    },
    /**
     * Reference to the game data associated with this user.
     */
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
});

export default mongoose.model("User", userSchema);
