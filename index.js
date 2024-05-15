// Charger les variables d'environnement
import "dotenv/config";

// Importation des modules avec ES6
import debug from "debug";
import express from "express";
import router from "./app/routers/main.router.js";
import session from "express-session";
import cors from "cors";
import corsOptions from "./config/cors.config.js";

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rendre les fichiers statiques disponibles
app.use(express.static("./public"));

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

app.use(router);

app.listen(PORT, () => {
  debug(`Application lancée sur le port ${PORT}`);
});






