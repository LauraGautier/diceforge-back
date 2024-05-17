import crypto from 'crypto';
import nodemailer from 'nodemailer';
import UserDataMapper from '../datamappers/user.datamapper.js';

const userDataMapper = new UserDataMapper();

export const requestPasswordReset = async (req, res) => {
    /*
  *  requestPasswordReset
  *  @description This function handles the password reset request for a user.
  *  It generates a reset token, stores it in the database with its expiration date,
  *  sends an email containing a reset link to the recipient, and handles any potential errors.
  *  @param {object} req - The HTTP request object containing the request information.
  *  @param {object} res - The HTTP response object for sending responses to the client.
  *  @returns {Promise<void>} - A promise that resolves by sending an HTTP response.
    */
    const { email } = req.body;

    try {
        const user = await userDataMapper.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        await userDataMapper.setPasswordResetToken(user.id, resetToken, resetTokenExpiry);

        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&id=${user.id}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'no-reply@yourdomain.com',
            subject: process.env.EMAIL_FROM,
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
        res.status(500).json({ error: "Erreur serveur" });
    }
};