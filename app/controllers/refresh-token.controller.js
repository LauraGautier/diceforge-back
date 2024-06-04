import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';
import { generateAccessToken } from '../utils/token.util.js';

const { secretKey } = jwtConfig; // Extraction de la clé secrète de la configuration JWT

// Fonction pour rafraîchir un token d'authentification
export const refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refreshToken; // Extraction du token de rafraîchissement depuis le corps de la requête

    // Vérifier et décoder le token de rafraîchissement
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
        if (err) { // Vérification des erreurs lors du décodage du token
            return res.status(403).json({ error: 'Token de rafraîchissement invalide' });
            // Si une erreur survient, renvoyer une réponse avec un code d'erreur approprié
        }

        // Générer un nouveau token d'authentification en utilisant l'ID décodé du token de rafraîchissement
        const accessToken = generateAccessToken({ id: decoded.id });

        // Renvoyer le nouveau token d'authentification
        res.json({ accessToken }); // Renvoi d'une réponse JSON contenant le nouveau token d'authentification
    });
};