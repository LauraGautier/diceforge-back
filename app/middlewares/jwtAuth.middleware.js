import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';
import "dotenv/config";

const jwtAuthMiddleware = (req, res, next) => {
    // Vérifier si l'en-tête d'autorisation est présent
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // En cas d'absence d'en-tête d'autorisation, renvoyer une erreur 401
        return res.status(401).json({ error: 'Authorization header manquant' });
    }

    // Extraire le token du header d'autorisation
    const token = authHeader.split(' ')[1];
    if (!token) {
        // En cas d'absence de token, renvoyer une erreur 401
        return res.status(401).json({ error: 'Token manquant' });
    }

    try {
        // Vérifier et décoder le token JWT
        const decodedToken = jwt.verify(token, jwtConfig.secretKey, {
            algorithms: ["HS256"],
        });

        // Stocker les données utilisateur décryptées dans req.userData
        req.userData = decodedToken;

        next();
    } catch (error) {
        // Gérer les erreurs de vérification du token JWT
        if (error instanceof jwt.TokenExpiredError) {
            // En cas d'expiration du token, renvoyer une erreur 403
            return res.status(403).json({ error: 'Token expiré' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            // En cas d'erreur de vérification du token, renvoyer une erreur 401
            return res.status(401).json({ error: 'Token invalide' });
        } else {
            // En cas d'autres erreurs, renvoyer une erreur 500
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
};

export default jwtAuthMiddleware;