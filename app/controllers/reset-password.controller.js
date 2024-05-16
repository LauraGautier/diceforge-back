import bcrypt from 'bcryptjs';
import UserDataMapper from '../datamappers/user.datamapper.js';

const userDataMapper = new UserDataMapper();

export const resetPassword = async (req, res) => {
    /*
 * resetPassword
 * @description This function handles the password reset process for a user.
 * It verifies the provided reset token, updates the user's password in the database,
 * and sends an HTTP response indicating the success or failure of the password reset operation.
 * @param {object} req - The HTTP request object containing the query parameters and request body.
 * @param {object} res - The HTTP response object for sending responses to the client.
 * @returns {Promise<void>} - A promise that resolves by sending an HTTP response.
 */
    const { token, id } = req.query;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
    }

    try {
        const user = await userDataMapper.findUserByResetToken(token);
        if (!user || user.id !== parseInt(id, 10)) {
            return res.status(400).json({ error: "Jeton invalide ou expiré" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userDataMapper.updatePassword(user.id, hashedPassword);

        res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};
