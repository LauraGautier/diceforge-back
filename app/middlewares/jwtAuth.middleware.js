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
        const decodedToken = jwt.verify(token, jwtConfig.secretKey);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide' });
    }
};

export default jwtAuthMiddleware;