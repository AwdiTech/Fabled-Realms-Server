import express from "express";
import { registerUser, loginUser, getUserProfile, verifyEmail, subscribeEmail } from "../../controllers/userController.js";
import { protect } from '../../api/middlewares/authMiddleware.js';

/**
 * Express router for handling user routes.
 * Routes include POST register, POST login, GET verify-email, and GET profile.
 *
 * @type {express.Router}
 */
const router = express.Router();


// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get user profile route
router.get("/profile", protect, getUserProfile);

// Verify email route
router.get("/verify-email", verifyEmail);

// Subscribe email route
router.post("/subscribe", subscribeEmail)


export default router;
