import express from 'express';
import mongoose from 'mongoose';
import gameRoutes from './api/routes/gameRoutes.js';
import userRoutes from './api/routes/userRoutes.js';
import { errorHandler } from './api/middlewares/errorMiddleware.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import * as cfg from './config/config.js';
const PORT = cfg.PORT;
const app = express();

mongoose.connect(cfg.DB_URI);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '..', 'build')));

// The "catchall" handler, which sends back the built client app for any request that doesn't match a route.
app.get(/^\/(?!api).*/, (req, res) => {
    const indexPath = path.join(__dirname, '..', 'build', 'index.html');
    res.sendFile(indexPath);
});


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
