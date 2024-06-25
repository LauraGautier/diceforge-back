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

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
}
);

app.use(router);

app.use(errorHandler);

setupSwagger(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on https://dice-forge-4eec83d84796.herokuapp.com:${PORT}/`);
});

export default app;
