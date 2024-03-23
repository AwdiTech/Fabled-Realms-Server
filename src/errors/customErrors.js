/**
 * Represents an error for resources not found.
 * @extends Error
 */
class NotFoundError extends Error {
    /**
     * Creates an instance of NotFoundError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

/**
 * Represents an error for unauthorized access.
 * @extends Error
 */
class UnauthorizedError extends Error {
    /**
     * Creates an instance of UnauthorizedError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

/**
 * Represents an error for forbidden access.
 * @extends Error
 */
class ForbiddenError extends Error {
    /**
     * Creates an instance of ForbiddenError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

/**
 * Represents an error for invalid data or bad requests.
 * @extends Error
 */
class ValidationError extends Error {
    /**
     * Creates an instance of ValidationError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
        this.statusCode = 500;
    }
}

export { NotFoundError, UnauthorizedError, ForbiddenError, ValidationError, ServerError};
