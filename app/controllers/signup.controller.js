import bcrypt from 'bcryptjs';
import pool from '../../config/pg.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import emailValidator from 'email-validator';
import { userSchema } from '../utils/user.validator.util.js';

const userDataMapper = new UserDataMapper(pool);

export const createUser = async (req, res) => {

    const { lastname, firstname, email, password, confirmPassword } = req.body;
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
