import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.util.js';

const userDataMapper = new UserDataMapper(pool);

export const login = async (req, res) => {
    // Fonction de gestion de la connexion utilisateur
    const { email, password } = req.body; // Extraction de l'email et du mot de passe à partir du corps de la requête
    const user = await userDataMapper.findUserByEmail(email); // Recherche de l'utilisateur dans la base de données par son email

    if (!user) {
        // Si l'utilisateur n'existe pas, renvoyer une erreur 401 Unauthorized
        return res.status(401).json({ error: "L'utilisateur n'existe pas ou le mot de passe est incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Vérification du mot de passe haché
    if (!isPasswordValid) {
        // Si le mot de passe est incorrect, renvoyer une erreur 401 Unauthorized
        return res.status(401).json({ error: "L'utilisateur n'existe pas ou le mot de passe est incorrect." });
    }

    // Génération des tokens JWT pour l'authentification
    const accessToken = generateAccessToken({ id: user.id, email: user.email }); // Génération du token d'authentification
    const refreshToken = generateRefreshToken({ id: user.id }); // Génération du token de rafraîchissement

    req.session.userId = user.id; // Stockage de l'identifiant de l'utilisateur dans la session
    // Envoi de la réponse avec les tokens JWT et les informations utilisateur
    return res.status(200).json({
        message: "Authentification réussie", accessToken, refreshToken, user: {
            userId: user.id,
            image: user.image,
            firstname: user.firstname,
            lastname: user.lastname,
        }
    })
};