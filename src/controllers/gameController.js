import Game from '../models/gameModel.js';
import { NotFoundError } from './../errors/customErrors.js';

// Contains the controller functions for saving and retrieving game data.

/**
 * Save game data: Create or update game data for a user.
 *
 * @param {Object} req - The request object containing the user ID and game data.
 * @param {Object} res - The response object used to send back the saved game data.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @throws {Error} - If there is an error while saving the game data.
 */
export const saveGameData = async (req, res, next) => {
    const userId = req.user._id;
    const { gameState } = req.body;

    try {
        let game = await Game.findOne({ user: userId });

        if (game) {
            // Update existing game data
            game.gameState = gameState;
            game.markModified('gameState');
            await game.save();
        } else {
            // Create new game data
            game = await Game.create({
                user: userId,
                gameState: gameState,
            });
        }

        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

/**
 * Get game data: Retrieve game data for a user.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object used to send back the game data.
 * @param {Function} next - The next middleware function in the stack, used for error handling.
 * @throws {NotFoundError} - If there is an error while retrieving the game data.
 */
export const getGameData = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const game = await Game.findOne({ user: userId });
        
        if (!game || !game.gameState){
            return res.status(200).json({ message: "Game data not found for this user", result: 'failed'});
        }

        res.status(200).json(game.gameState);
    } catch (error) {
        next(error);
    }
};