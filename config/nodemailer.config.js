import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Configuration du transporter de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // Utilise STARTTLS
    tls: {
        ciphers: 'TLSv1.2',
        rejectUnauthorized: true
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour générer un token d'invitation
const generateInvitationToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Fonction pour envoyer un email d'invitation
const sendInvitationEmail = async (email, gameId) => {
    const token = generateInvitationToken({ email, gameId });
    const invitationLink = `http://localhost:5173/api/joingame?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Come on and play with us!',
        text: `Click on the invitation: ${invitationLink}`,
        html: `<p>Click here to join the game: <a href="${invitationLink}">${invitationLink}</a></p>`
    };

        return mailOptions;
};



export { sendInvitationEmail, generateInvitationToken, transporter };
