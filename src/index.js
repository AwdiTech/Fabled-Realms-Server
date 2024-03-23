import express from 'express';
import mongoose from 'mongoose';
import gameRoutes from './api/routes/gameRoutes.js';
import userRoutes from './api/routes/userRoutes.js';
import { errorHandler } from './api/middlewares/errorMiddleware.js';
import cors from 'cors';
import * as cfg from './config/config.js';
const PORT = cfg.PORT;
const app = express();

mongoose.connect(cfg.DB_URI);


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Routes
app.use('/api/game', gameRoutes);

app.use('/api/user', userRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});