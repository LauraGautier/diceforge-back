import 'dotenv/config';
import express from 'express';
import { createServer } from 'node:http';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './app/routers/main.router.js';
import session from 'express-session';
import cors from 'cors';
import corsOptions from './config/cors.config.js';
import setupSocket from './config/socket.config.js';
import errorHandler from './app/middlewares/errorHandler.middleware.js';
import setupSwagger from './config/swagger.config.js';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

// Middleware pour parser les corps de requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Détermine le chemin vers le répertoire dist du front-end
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../diceforge-front/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../diceforge-front/dist', 'index.html'));
});

// Activation CORS
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

const io = setupSocket(httpServer);

app.use(router);

app.use(errorHandler);

setupSwagger(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
