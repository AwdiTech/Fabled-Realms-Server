/**
 * Error handler middleware to centralize error handling for controllers and middleware.
 * Adjusts response status code based on known error types or uses a general 500 status for unknown errors.
 * Only outputs error stack in development mode, otherwise hides the stack trace.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Handle specific error types here
    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403; // Forbidden
    } else if (err.name === 'NotFoundError') {
        statusCode = 404; // Not Found
    }

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🚨' : err.stack,
    });
};

export { errorHandler };
