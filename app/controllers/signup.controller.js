import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import emailValidator from 'email-validator';
import { userSchema } from '../utils/user.validator.util.js';

const userDataMapper = new UserDataMapper(pool);


/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Registers a new user in the system, ensuring they meet validation criteria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastname
 *               - firstname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *               confirmPassword:
 *                 type: string
 *                 description: A confirmation of the password for validation purposes.
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming user creation.
 *       400:
 *         description: Invalid input, details provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message related to user input validation.
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *       409:
 *         description: Email already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message stating the email is already used.
 */
export const createUser = async (req, res) => {

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
