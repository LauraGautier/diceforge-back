import crypto from 'crypto';
import nodemailer from 'nodemailer';
import UserDataMapper from '../datamappers/user.datamapper.js';
import pool from '../../config/pg.client.js';

const userDataMapper = new UserDataMapper(pool);

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // false si vous utilisez STARTTLS
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'diceforgeteam@outlook.com',
        pass: 'Bfljb1307'
    }
});

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // false si vous utilisez STARTTLS
    tls: { ciphers: 'SSLv3' },
    auth: {
        user: 'diceforgeteam@outlook.com',
        pass: 'Bfljb1307'
    }
});
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userDataMapper.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000);
        console.log('resetTokenExpiry:', resetTokenExpiry.toISOString());
        console.log('resetToken:', resetToken);

        await passwordDataMapper.setPasswordResetToken(user.id, resetToken, resetTokenExpiry);

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&id=${user.id}`;

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
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};