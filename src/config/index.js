/* The config/index.js file acts as a unified access point for all configuration settings. This means any part of your 
    application that needs to access configuration variables will import them from this single location, rather than 
    scattering environment variable accesses throughout your code.*/

// Example Structure:

// Load environment variables from .env file
require('dotenv').config();

// Define configuration settings for different aspects of your app
// const dbConfig = {
//     uri: process.env.DB_URI,
//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     },
// };

// const jwtConfig = {
//     secret: process.env.JWT_SECRET,
//     expiresIn: '1d', // example value
// };

// // Export configurations
// module.exports = {
//     dbConfig,
//     jwtConfig,
//     // any other configurations
// };
