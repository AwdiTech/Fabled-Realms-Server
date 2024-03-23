import { config } from 'dotenv';
config();

/**
 * Configuration file for the Fabled Realms server.
 * 
 * Please make sure to set the following environment variables:
 * - DB_URI: The URI for the MongoDB database.
 * - DB: The name of the MongoDB database.
 * - PORT: The port number for the server.
 * - SECRET: The secret key for access tokens. Generate a random unique string for this.
 * - REFRESH_SECRET: The secret key for refresh tokens. Generate a random unique string for this.
 * - DOMAIN: The domain for the server.
 * - SENDGRID_API_KEY: SendGrid API key. For sending emails.
 */

/**
 * The URI for the database.
 * @type {string}
 */
export const DB_URI = process.env.DB_URI;

/**
 * The name of the database.
 * @type {string}
 */
export const DB = process.env.DB;

/**
 * The port number for the server.
 * @type {number}
 */
export const PORT = process.env.PORT || 24120;

/**
 * The secret key for access tokens.
 * @type {string}
 */
export const SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * The secret key for refresh tokens.
 * @type {string}
 */
export const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

/**
 * The domain for the server.
 * @type {string}
 */
export const DOMAIN = process.env.DOMAIN;

/**
 * SendGrid API key.
 * @type {string}
 */
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;