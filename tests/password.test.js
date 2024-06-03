import test from 'ava';
import request from 'supertest';
import proxyquire from 'proxyquire';
import express from 'express';

// Simuler les dépendances
const findUserByEmail = async (email) => {
    if (email === 'notfound@example.com') {
        return null;
    }
    return { id: 1, email };
};

const setPasswordResetToken = async (userId, resetToken, resetTokenExpiry) => {
    // Simuler le comportement attendu
};

const sendPasswordResetEmail = async (user, resetToken) => {
    if (user.email === 'fail@example.com') {
        throw new Error('Email sending failed');
    }
};

// Charger le module avec les dépendances simulées
const { requestPasswordReset } = proxyquire('../path/to/requestPasswordReset', {
    '../datamappers/user.datamapper.js': function () {
        return { findUserByEmail };
    },
    '../datamappers/password.datamapper.js': function () {
        return { setPasswordResetToken };
    },
    '../../config/nodemailer.config.js': { sendPasswordResetEmail },
    '../utils/token.util.js': {
        generateResetToken: () => ({ resetToken: 'mockToken', resetTokenExpiry: new Date() })
    },
    '../../config/pg.config.js': {},
});

// Configurer l'application express pour le test
const app = express();
app.use(express.json());
app.post('/request-password-reset', requestPasswordReset);

// Test utilisateur non trouvé
test('requestPasswordReset - utilisateur non trouvé', async t => {
    const response = await request(app)
        .post('/request-password-reset')
        .send({ email: 'notfound@example.com' });

    t.is(response.status, 404);
    t.deepEqual(response.body, { error: "Utilisateur non trouvé" });
});

// Test réinitialisation réussie
test('requestPasswordReset - réinitialisation réussie', async t => {
    const response = await request(app)
        .post('/request-password-reset')
        .send({ email: 'test@example.com' });

    t.is(response.status, 200);
    t.deepEqual(response.body, { message: "Email de réinitialisation envoyé" });
});

// Test échec d'envoi de l'email
test('requestPasswordReset - échec d\'envoi de l\'email', async t => {
    const response = await request(app)
        .post('/request-password-reset')
        .send({ email: 'fail@example.com' });

    t.is(response.status, 500);
    t.deepEqual(response.body, { error: "Erreur lors de l'envoi de l'email" });
});
