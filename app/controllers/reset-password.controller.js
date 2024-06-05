import bcrypt from 'bcryptjs';
import PasswordDataMapper from '../datamappers/password.datamapper.js';
import pool from '../../config/pg.config.js'; 

const passwordDataMapper = new PasswordDataMapper(pool);

export const resetPassword = async (req, res) => {
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
