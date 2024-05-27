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

    const decodedToken = jwt.verify(token, jwtConfig.secretKey, {
        algorithms: ["HS256"], // Algorithme de signature
        maxAge: jwtConfig.options.expiresIn, // Durée de vie du token
    });

    req.userData = decodedToken;
    next();
};

export default jwtAuthMiddleware;