import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';
import { generateAccessToken } from '../utils/token.util.js';

const { secretKey } = jwtConfig; // Extraction de la clé secrète de la configuration JWT

export const refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refreshToken; 

    // Vérifier et décoder le token de rafraîchissement
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
        if (err) { 
            return res.status(403).json({ error: 'Token de rafraîchissement invalide' });
        }
        const accessToken = generateAccessToken({ id: decoded.id });
        res.json({ accessToken }); // Renvoi d'une réponse JSON contenant le nouveau token d'authentification
    });
};