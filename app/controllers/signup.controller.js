import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import emailValidator from 'email-validator';
import { userSchema } from '../utils/user.validator.util.js';

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
   * - 500 if an unexpected error occurs.
   */
    const { lastname, firstname, email, password, confirmPassword } = req.body;

    // Validate the user data with zod
     try {
        userSchema.parse({ lastname, firstname, password });
    } catch (e) {
        return res.status(400).json({ error: "Données invalides", details: e.errors });
    }

    if (!email || !lastname || !firstname || !password || !confirmPassword) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const existingUser = await userDataMapper.findUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: "Cet email n'est pas valide" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await userDataMapper.createUser( lastname, firstname, email, hashedPassword);
    return res.status(201).json({ message: "Utilisateur créé" });
}
