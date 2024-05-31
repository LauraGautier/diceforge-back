import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // Uses STARTTLS
    tls: {
        ciphers: 'TLSv1.2',
        rejectUnauthorized: true
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendInvitationEmail = async (email, gameId, token) => {
    const invitationLink = `http://localhost:5173/api/joingame?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Come on and play with us!',
        text: `Click on the invitation: ${invitationLink}`,
        html: `<p>Click here to join the game: <a href="${invitationLink}">${invitationLink}</a></p>`
    };

    return transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (user, resetToken) => {
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

    return transporter.sendMail(mailOptions);
};
