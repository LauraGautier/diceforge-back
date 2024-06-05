import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.util.js';

const userDataMapper = new UserDataMapper(pool);

export const login = async (req, res) => {
  
    const { email, password } = req.body; 
    const user = await userDataMapper.findUserByEmail(email);

    if (!user) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas ou le mot de passe est incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas ou le mot de passe est incorrect." });
    }

    const accessToken = generateAccessToken({ id: user.id, email: user.email }); // Génération du token d'authentification
    const refreshToken = generateRefreshToken({ id: user.id }); // Génération du token de rafraîchissement
    
    req.session.userId = user.id; 
    return res.status(200).json({
        message: "Authentification réussie", accessToken, refreshToken, user: {
            userId: user.id,
            image: user.image,
            firstname: user.firstname,
            lastname: user.lastname,
        }
    })
};