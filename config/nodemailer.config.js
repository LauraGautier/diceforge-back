import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // false si vous utilisez STARTTLS
    tls: { ciphers: 'TLSv1.2', rejectUnauthorized: true },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generateInvitationToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const sendInvitationEmail = async (email, gameId) => {
    const token = jwt.sign({ email, gameId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const invitationLink = `http://localhost:5173/api/joingame?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Come on and play with us!',
        text: `Clic sur l'invitation: ${invitationLink}`,
        html: `<p>Clic ici pour rejoindre la game: <a href="${invitationLink}">${invitationLink}</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Invitation successfully', email);
    } catch (error) {
        console.error('Error invitation:', error);
        throw error; 
    }
};

export default { sendInvitationEmail, generateInvitationToken, transporter };
