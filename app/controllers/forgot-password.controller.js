import { generateResetToken } from '../utils/token.util.js';
import { sendPasswordResetEmail } from '../../config/nodemailer.config.js';
import UserDataMapper from '../datamappers/user.datamapper.js';
import PasswordDataMapper from '../datamappers/password.datamapper.js';
import pool from '../../config/pg.config.js';

const userDataMapper = new UserDataMapper(pool);
const passwordDataMapper = new PasswordDataMapper(pool);

export const requestPasswordReset = async (req, res) => {
 /**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 *       500:
 *         description: Error sending email
 */
    const { email } = req.body;
    const user = await userDataMapper.findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const { resetToken, resetTokenExpiry } = generateResetToken();

    await passwordDataMapper.setPasswordResetToken(user.id, resetToken, resetTokenExpiry);

    try {
        await sendPasswordResetEmail(user, resetToken);
        res.status(200).json({ message: "Email de réinitialisation envoyé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
    }
};
