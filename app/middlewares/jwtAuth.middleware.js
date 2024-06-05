import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header manquant' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    try {
        const decodedToken = jwt.verify(token, jwtConfig.secretKey, {
            algorithms: ["HS256"],
        });

        req.userData = decodedToken;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: 'Token expiré' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token invalide' });
        } else {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
};

export default jwtAuthMiddleware;