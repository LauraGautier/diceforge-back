import bcrypt from 'bcryptjs';
import PasswordDataMapper from '../datamappers/password.datamapper.js';
import pool from '../../config/pg.config.js'; // Importation du pool de connexions

const passwordDataMapper = new PasswordDataMapper(pool);

export const resetPassword = async (req, res) => {
    /**
     * @openapi
     * /resetPassword:
     *   post:
     *     summary: Reset user password
     *     tags: [Password]
     *     description: This endpoint allows for a user to reset their password.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - token
     *               - id
     *               - password
     *               - confirmPassword
     *             properties:
     *               token:
     *                 type: string
     *                 description: The token for password reset.
     *               id:
     *                 type: integer
     *                 description: The user's id.
     *               password:
     *                 type: string
     *                 description: The new password.
     *               confirmPassword:
     *                 type: string
     *                 description: The new password confirmation.
     *     responses:
     *       200:
     *         description: Password reset successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Success message.
     *       400:
     *         description: Bad request, token or id missing or passwords do not match or invalid or expired token.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     *       500:
     *         description: Internal server error.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Error message.
     */
    try {
        const { token, id, password, confirmPassword } = req.body;

        if (!token || !id) {
            console.error("Token or ID missing");
            return res.status(400).json({ error: "Token et ID requis" });
        }

        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
        }

        const user = await passwordDataMapper.findUserByResetToken(token);

        if (!user || user.id !== parseInt(id, 10)) {
            console.error("Invalid or expired token");
            return res.status(400).json({ error: "Jeton invalide ou expiré" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await passwordDataMapper.updatePassword(user.id, hashedPassword);

        res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};
