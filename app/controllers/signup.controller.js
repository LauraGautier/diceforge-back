import bcrypt from 'bcryptjs';
import pool from '../../config/pg.client.js';
import UserDataMapper from '../datamappers/user.datamapper.js';

const userDataMapper = new UserDataMapper(pool);

export const createUser = async (req, res) => {
  
      /**
     * Creates a new user in the database.
     *
     * @param {object} req - The HTTP request object, containing details of the user to be created.
     * @param {object} res - The HTTP response object to send responses back to the client.
     * @returns {Promise<void>} - A promise that resolves by sending an HTTP response.
     *
     * @description
     * This function extracts user information from the request object, verifies the validity of the data,
     * and uses UserDataMapper to create the user in the database. HTTP responses are sent based on the result of the operations:
     * - 400 if mandatory information is missing or if the passwords do not match.
     * - 409 if the email is already in use.
     * - 201 if the user is successfully created.
     * - 500 in case of a server error.
     */

    const { email, lastname, firstname, password, confirmPassword } = req.body;

    if (!email || !lastname || !firstname || !password || !confirmPassword) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const existingUser = await userDataMapper.findUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas"});
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await userDataMapper.createUser(email, lastname, firstname, hashedPassword);
        return res.status(201).json({ message: "Utilisateur créé" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
