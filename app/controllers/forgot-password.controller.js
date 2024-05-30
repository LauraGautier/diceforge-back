import crypto from 'crypto';
import UserDataMapper from '../datamappers/user.datamapper.js';
import PasswordDataMapper from '../datamappers/password.datamapper.js'; // Importer PasswordDataMapper
import pool from '../../config/pg.config.js';
import { transporter } from '../../config/nodemailer.config.js';

const userDataMapper = new UserDataMapper(pool);
const passwordDataMapper = new PasswordDataMapper(pool); // Créer une instance de PasswordDataMapper

// Configuration du transporteur Nodemailer


export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const user = await userDataMapper.findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Utilisation de passwordDataMapper pour définir le token de réinitialisation
    await passwordDataMapper.setPasswordResetToken(user.id, resetToken, resetTokenExpiry);

    const resetLink = `http://localhost:5173/api/reset-password?token=${resetToken}&id=${user.id}`;
    const mailOptions = {
        to: user.email,
        from: 'diceforgeteam@outlook.com',
        subject: 'Réinitialisation de mot de passe',
        text: `Vous recevez cet email parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
             Cliquez sur le lien suivant ou copiez-le dans votre navigateur pour compléter le processus:\n\n
             ${resetLink}\n\n
             Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
        }
        res.status(200).json({ message: "Email de réinitialisation envoyé" });
    });
};
       