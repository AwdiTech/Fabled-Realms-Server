/**
 * Utility functions for generating and verifying JWT tokens.
 * @module utils/jwtUtils
 * @requires jsonwebtoken
 * @requires config/config
 */

import jwt from 'jsonwebtoken';
import * as cfg from './../config/config.js';

/**
 * Generates a JWT token for a user.
 * @param {string} userId - The user's ID.
 * @returns {string} - A JWT token.
 */
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, cfg.SECRET, { expiresIn: '1h' });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded JWT payload if the token is valid.
 */
export const verifyToken = (token) => {
    return jwt.verify(token, cfg.SECRET);
};
