import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config.js';

const userDataMapper = new UserDataMapper(pool);

export const login = async (req, res) => {
    /**
 * Handles user login.
 *
 * @description
 * This function handles user login by verifying the provided login credentials.
 * It extracts the email and password from the request body, then attempts to find the user in the database
 * based on the provided email. If the user does not exist or if the password is incorrect,
 * it sends a 401 Unauthorized response with an appropriate error message.
 * If the login is successful, it sends a 200 OK for authentication.
 * In case of any unexpected errors, it sends a 500 Internal Server Error response.
 */
    const { email, password } = req.body;
    const user = await userDataMapper.findUserByEmail(email);

    if (!user) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas ou le mot de passe incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas ou le mot de passe incorrect." });
    }
    // Génération du token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secretKey, { expiresIn: '1h' });


    req.session.userId = user.id;
    return res.status(200).json({
        message: "Authentification réussie", token, user: {
            userId: user.id,
            image: user.image,
            firstname: user.firstname,
            lastname: user.lastname,
        }
    }), userDataMapper.findUserByEmail(email);
};
