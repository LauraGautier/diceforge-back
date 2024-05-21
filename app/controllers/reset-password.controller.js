import bcrypt from 'bcryptjs';
import PasswordDataMapper from '../datamappers/password.datamapper.js';
import pool from '../../config/pg.config.js'; // Importation du pool de connexions

const passwordDataMapper = new PasswordDataMapper(pool);

export const resetPassword = async (req, res) => {
    /**
     * @description This function handles the password reset process for a user.
     * It verifies the provided reset token, updates the user's password in the database,
     * and sends an HTTP response indicating the success or failure of the password reset operation.
     * The HTTP request object containing the query parameters and request body.
     * The HTTP response object for sending responses to the client.
     * A promise that resolves by sending an HTTP response.
     */
    const { token, id } = req.query;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
    }
    const user = await passwordDataMapper.findUserByResetToken(token);

    if (!user || user.id !== parseInt(id, 10)) {
        return res.status(400).json({ error: "Jeton invalide ou expiré" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await passwordDataMapper.updatePassword(user.id, hashedPassword);

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
};
