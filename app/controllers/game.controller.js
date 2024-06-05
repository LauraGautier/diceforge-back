import pool from '../../config/pg.config.js';
import GameDataMapper from '../datamappers/game.datamapper.js';
import LicenseDataMapper from '../datamappers/license.datamapper.js';
import { sendInvitationEmail, transporter } from '../../config/nodemailer.config.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import UserDataMapper from '../datamappers/user.datamapper.js';

const gameDataMapper = new GameDataMapper(pool);
const licenseDataMapper = new LicenseDataMapper(pool);
const userDataMapper = new UserDataMapper(pool);

export const getGame = async (req, res) => {

    const id = req.params.id;
    const game = await gameDataMapper.findGameById(id);

    if (!game) {
        return res.status(404).json({ error: "La partie n'existe pas." });
    }

    return res.status(200).json(game);
}

export const createGame = async (req, res) => {
    const game = req.body;
    const userId = req.userData.id;
    const email = req.body.email;

    if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non connecté.' });
    }

    if (!game.name || !game.license_name) {
        return res.status(400).json({ error: 'Champs de jeu requis manquants.' });
    }

    try {
        const license = await licenseDataMapper.findLicenseByName(game.license_name);
        if (!license) {
            return res.status(400).json({ error: 'Licence non trouvée.' });
        }

        const createdGame = await gameDataMapper.createGame(game, userId);
        if (!createdGame) {
            return res.status(500).json({ error: 'Erreur lors de la création du jeu.' });
        }

        // Envoie de l'email d'invitation
        const mailOptions = await sendInvitationEmail(email, createdGame.id);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erreur lors de l'envoi de l'email:", error);
                return res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
            }
        });

        return res.status(201).json(createdGame);
    } catch (error) {
        console.error('Erreur lors de la création du jeu :', error);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

export const joinGame = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ error: 'Token d\'invitation manquant.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { email, gameId } = decodedToken;

        const game = await gameDataMapper.findGameById(gameId);
        if (!game) {
            return res.status(404).json({ error: 'Partie non trouvée.' });
        }

        const user = await userDataMapper.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        const role = 'player';
        await gameDataMapper.joinGame(gameId, user.id, role);

        return res.status(200).json(game);
        
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ error: 'Token d\'invitation invalide.' });
        }
        console.error('Erreur lors de la jonction au jeu :', error);
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

export const updateGame = async (req, res) => {
    const game = {
        id: req.params.id,
        name: req.body.name,
        music: req.body.music,
        note: req.body.note,
        event: req.body.event
    };

    const updatedGame = await gameDataMapper.updateGame(game);
    if (!updatedGame) {
        return res.status(404).json({ message: "la partie n'a pas été trouvé" });
    }
    res.status(200).json(updatedGame);
};

export const deleteGame = async (req, res) => {
    const id = req.params.id;
    await gameDataMapper.deleteGame(id);
    res.status(204).send();
}

export const findGamesByUserId = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }
    try {
        const games = await gameDataMapper.findGamesByUserId(userId);
        return res.status(200).json(games);
    } catch (error) {
        console.error('Failed to fetch games:', error);
        return res.status(500).json({ error: "Failed to fetch games." });
    }
};


