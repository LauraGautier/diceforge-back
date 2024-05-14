// Charger les variables d'environnement
import "dotenv/config";

// Importation des modules avec ES6
import express from "express";
import router from "./app/router/router.js";
import session from "express-session";

// Initialisation
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rendre les fichiers statiques disponibles
app.use(express.static("./public"));

app.use(router);

app.listen(PORT, () => {
  debug(`Application lancée sur le port ${PORT}`);
});






