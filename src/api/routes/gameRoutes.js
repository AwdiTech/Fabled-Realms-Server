import express from 'express';
import { saveGameData, getGameData } from '../../controllers/gameController.js';
import { protect } from '../../api/middlewares/authMiddleware.js';

/**
 * Express router instance for handling game routes.
 * Routes include POST save and GET load.
 * @type {express.Router}
 */
const router = express.Router();


// Save Game Data Route
router.post('/save', protect, saveGameData);

// Load Game Data Route
router.get('/load', protect, getGameData);


export default router;
