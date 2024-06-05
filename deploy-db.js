
import { exec } from 'child_process'; // Importer la fonction exec pour exécuter des commandes shell
import fs from 'fs'; // Importer le module fs pour interagir avec le système de fichiers
import path from 'path'; // Importer le module path pour travailler avec les chemins de fichiers et de répertoires
import { fileURLToPath } from 'url'; // Importer fileURLToPath pour convertir les URLs de modules en chemins de fichiers
import 'dotenv/config'; // Importer et configurer dotenv pour charger les variables d'environnement depuis un fichier .env

// Résoudre le __dirname pour les modules ES
// __filename représente le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url);
// __dirname représente le répertoire du fichier actuel
const __dirname = path.dirname(__filename);

// Chemin vers le dossier contenant les fichiers SQL
const migrationsPath = path.join(__dirname, 'migrations', 'deploy');

// Fonction pour exécuter une commande shell
const execShellCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error); // Afficher un avertissement en cas d'erreur
        reject(error); // Rejeter la promesse en cas d'erreur
      }
      resolve(stdout ? stdout : stderr); // Résoudre la promesse avec la sortie standard ou l'erreur standard
    });
  });
};

// Déployer les fichiers SQL
const deployDatabase = async () => {
  try {
    // Lire tous les fichiers dans le dossier de migrations
    const files = fs.readdirSync(migrationsPath);

    // Pour chaque fichier dans le dossier de migrations
    for (const file of files) {
      // Construire le chemin complet du fichier
      const filePath = path.join(migrationsPath, file);
      // Construire la commande psql pour exécuter le fichier SQL
      const cmd = `psql -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -h ${process.env.DB_HOST} -f ${filePath}`;
      console.log(`Executing ${cmd}`); // Afficher la commande en cours d'exécution
      // Exécuter la commande shell et attendre son achèvement
      const output = await execShellCommand(cmd);
      console.log(output); // Afficher la sortie de la commande
    }

    console.log('Database deployment completed successfully'); // Afficher un message de réussite
  } catch (error) {
    console.error('Error deploying database:', error); // Afficher un message d'erreur en cas de problème
  }
};

// Appeler la fonction de déploiement de la base de données
deployDatabase();
