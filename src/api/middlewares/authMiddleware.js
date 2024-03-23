import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import * as cfg from './../../config/config.js';

/**
 * Middleware function to protect routes that require authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, cfg.SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            next(error.name === 'JsonWebTokenError' ?
                new UnauthorizedError('Not authorized, token failed')
                : error
            );
        }
    } else {
        next(new UnauthorizedError('Not authorized, no token'));
    }
};

export { protect };
