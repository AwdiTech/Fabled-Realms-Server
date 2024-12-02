# Fabled Realms Prototype - Server

![Fabled-Realms-Gameplay_SC](https://i.imgur.com/O8DoGu1.png)

Welcome to the server repository for the prototype of **Fabled Realms**, an online Pixel-Art Open-World RPG game that combines fast-paced action gameplay with immersive open world storytelling. This repository contains the backend code necessary to handle everything from user authentication to game state management.

## Features

- **User Authentication:** Secure login and registration functionality.
- **Game State Management:** Real-time game state updates and management.
- **Performance Optimized:** Efficient handling of requests to support seamless gameplay.
- **Error Handling:** Comprehensive error handling to enhance user experience and simplify debugging.
- **Email Verification:** Automated email verification for user registration.

## Directory Structure

```
.
├── build                  # Compiled files
├── node_modules           # Project dependencies
├── src                    # Source files
│   ├── api
│   │   ├── middlewares    # Middleware for handling auth and errors
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── routes         # API routes for game and user operations
│   │   │   ├── gameRoutes.js
│   │   │   └── userRoutes.js
│   ├── config             # Configuration files
│   │   └── config.js
│   ├── controllers        # Controllers for user and game management
│   │   ├── gameController.js
│   │   └── userController.js
│   ├── errors             # Custom error definitions
│   │   └── customErrors.js
│   ├── models             # Database models
│   │   ├── gameModel.js
│   │   ├── subscriberModel.js
│   │   └── userModel.js
│   ├── services           # Business logic implementation
│   │   ├── gameService.js
│   │   └── userService.js
│   ├── utils              # Utility functions, particularly for JWT handling
│   │   └── jwtUtils.js
│   ├── views              # HTML templates for emails
│   │   ├── emailVerified.html
│   │   └── errorVerification.html
│   └── index.js           # Entry point for the server application
├── .gitignore             # Specifies intentionally untracked files to ignore
├── Procfile               # Specifies commands that are executed by the app on startup
```

## Technologies

- **Node.js:** For the server environment.
- **Express:** Web application framework.
- **MongoDB/Mongoose:** For database management.
- **JWT:** For handling JSON Web Tokens.
- **Nodemailer:** For sending emails directly from the server.

---
