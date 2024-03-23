/**
 * Schema for the game state data associated with a user.
 * @module models/gameModel
 * @requires mongoose
 */

import mongoose from "mongoose";

/**
 * Game state schema definition. Contains the following fields: gameState, createdAt, updatedAt, user.
 * @type {mongoose.Schema}
 */
const gameStateSchema = new mongoose.Schema({
    /**
     * Game state data which can be any JSON object.
     */
    gameState: mongoose.Schema.Types.Mixed,
    /**
     * Date and time when the game data was created.
     */
    createdAt: {
        type: Date,
        default: Date.now,
    },
    /**
     * Date and time when the game data was last updated.
     */
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    /**
     * Reference to the user associated with this game data.
     */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

/**
 * Middleware to automatically set the updatedAt field before saving.
 */
gameStateSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Game", gameStateSchema);
