import bcrypt from 'bcryptjs';
import PasswordDataMapper from '../datamappers/password.datamapper.js';
import pool from '../../config/pg.config.js'; // Importation du pool de connexions

// Initialisation de l'instance de PasswordDataMapper avec le pool de connexions
const passwordDataMapper = new PasswordDataMapper(pool);

export const resetPassword = async (req, res) => {
    /**
     * @description This function handles the password reset process for a user.
     * It verifies the provided reset token, updates the user's password in the database,
     * and sends an HTTP response indicating the success or failure of the password reset operation.
     * @param {object} req - The HTTP request object containing the query parameters and request body.
     * @param {object} res - The HTTP response object for sending responses to the client.
     * @returns {Promise<void>} - A promise that resolves by sending an HTTP response.
     */
    const { token, id } = req.query;
    const { password, confirmPassword } = req.body;

    // Vérification si les mots de passe correspondent
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
    }

    try {
        // Recherche de l'utilisateur par token de réinitialisation
        const user = await passwordDataMapper.findUserByResetToken(token);

        // Vérification si l'utilisateur existe et si l'ID correspond
        if (!user || user.id !== parseInt(id, 10)) {
            return res.status(400).json({ error: "Jeton invalide ou expiré" });
        }

        // Hachage du nouveau mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mise à jour du mot de passe dans la base de données
        await passwordDataMapper.updatePassword(user.id, hashedPassword);

        // Réponse en cas de succès
        res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
        console.error('Erreur serveur lors de la réinitialisation du mot de passe:', error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
