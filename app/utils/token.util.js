import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';

const { secretKey, options } = jwtConfig;

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: options.accessExpiresIn });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: options.refreshExpiresIn });
};

export const generateInvitationToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

export const generateResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    return { resetToken, resetTokenExpiry };
};
