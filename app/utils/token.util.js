import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';

const { secretKey, options } = jwtConfig; // Extraction de la clé secrète et des options JWT de la configuration

// Fonction pour générer un token d'authentification
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: options.accessExpiresIn });
    // Utilisation de la méthode sign() pour signer le token avec la clé secrète et les options spécifiées
};

// Fonction pour générer un token de rafraîchissement
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: options.refreshExpiresIn });
    // Utilisation de la méthode sign() pour signer le token avec la clé secrète et la durée de vie spécifiée pour le rafraîchissement
};
