import path from 'path';
import { fileURLToPath } from 'url';
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from 'nodemailer';
import { generateToken } from './../utils/jwtUtils.js';
import Game from '../models/gameModel.js';
import { NotFoundError, UnauthorizedError, ValidationError, ServerError } from './../errors/customErrors.js';
import * as cfg from './../config/config.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Contains the controller functions for user registration, email verification, user login, and user profile retrieval.

/**
 * Register a new user.
 *
 * @param {Object} req - The request object containing user registration details.
 * @param {Object} res - The response object used to send back the newly created user details.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @throws {ValidationError} If the email or username is already in use.
 */
export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            throw new ValidationError("Email or Username already in use");
        }

        // Generate a verification token for email verification
        const verificationToken = crypto.randomBytes(20).toString("hex");

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            emailVerified: false,
            verificationToken,
        });

        // Configure transporter for sending emails
        let transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587, // or 465 for SSL
            secure: false, // true for 465, false for other ports
            auth: {
                user: "apikey", // SendGrid recommends using 'apikey' as the user
                pass: cfg.SENDGRID_API_KEY // replace with your actual SendGrid API key
            }
        });


        const verificationUrl = `${cfg.DOMAIN}/api/user/verify-email?token=${verificationToken}`;

        await transporter.sendMail({
            from: '"Fabled Realms" <no-reply@fabledrealms.online>',
            to: user.email,
            subject: "Please verify your email address",
            html: `Please click this link to verify your email address: <a href="${verificationUrl}">${verificationUrl}</a>`,
        });



        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: "Registration successful. Please check your email to verify your account."
        });

    } catch (error) {
        next(error);
    }
};


/**
 * Verifies the user's email using a verification token.
 * @param {Object} req - The request object containing the verification token.
 * @param {Object} res - The response object used to send back the verification status.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 */
export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).sendFile(path.join(__dirname, '../views/errorVerification.html'));
        }

        user.emailVerified = true;
        user.verificationToken = undefined; // Clear the verification token
        await user.save();

        // Serve the HTML file as a response
        return res.status(400).sendFile(path.join(__dirname, '../views/emailVerified.html'));
    } catch (error) {
        try {
            return res.status(400).sendFile(path.join(__dirname, '../views/errorVerification.html'));
        } catch (error) {
            next(new ServerError(error.message));
        }
    }
};


/**
 * Login user and generate JWT token.
 *
 * @param {Object} req - The request object containing login credentials.
 * @param {Object} res - The response object used to send back the JWT token and user details.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @throws {UnauthorizedError} If the username or password is invalid.
 */
export const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check for user existence
        const user = await User.findOne({ username });
        if (!user) {
            throw new UnauthorizedError("Login Failed: Invalid Username or Password");
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedError("Login Failed: Invalid Username or Password");
        }

        // In your loginUser function
        if (!user.emailVerified) {
            throw new UnauthorizedError('Please verify your email address to login');
        }


        // Generate JWT token
        const token = generateToken(user.id);

        res.json({
            token,
            user: {
                _id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Get user profile.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the user profile.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @throws {NotFoundError} If the user is not found.
 */
export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find user by ID and exclude the password field
        const user = await User.findById(userId).select("-password");

        if (!user) {
            throw new NotFoundError("User not found");
        }

        // Fetch the associated game state using the userId
        const game = await Game.findOne({ user: userId });

        if (!game) {
            // Handle case where game data does not exist for the user
            return res.status(404).json({ message: "Game data not found for this user" });
        }

        res.json({
            userId: userId,
            username: user.username,
            gameState: game.gameState, // Include the gameState from the fetched Game document
        });
    } catch (error) {
        next(error);
    }
};
