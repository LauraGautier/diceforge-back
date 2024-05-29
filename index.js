// Charger les variables d'environnement
import "dotenv/config";

// Importation des modules avec ES6
import express from 'express';
import { createServer } from "node:http";

import router from "./app/routers/main.router.js";
import session from "express-session";
import cors from "cors";
import corsOptions from "./config/cors.config.js";
import setupSocket from "./config/socket.config.js"; 
import errorHandler from "./app/middlewares/errorHandler.middleware.js";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware pour parser les corps de requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rendre les fichiers statiques disponibles
app.use(express.static("./public"));

// Activation CORS
app.use(cors(corsOptions));

// Configuration des sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
  })
);

// Configuration de Socket.IO
const io = setupSocket(httpServer);  // Utilisation de la fonction importée

// Routes
app.use(router);

app.use(errorHandler);

// Démarrage du serveur HTTP
httpServer.listen(PORT, () => {
  console.log(`Application lancée sur le port ${PORT}`);
});
