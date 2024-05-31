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
   /**
     * @swagger
     * /game/{id}:
     *   get:
     *     summary: Get game by ID
     *     tags: [Games]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the game to get
     *         schema:
     *           type: integer
    */
    const id = req.params.id;
    const game = await gameDataMapper.findGameById(id);

    if (!game) {
        return res.status(404).json({ error: "La partie n'existe pas." });
    }

    return res.status(200).json(game);
}



export const createGame = async (req, res) => {
        /**
     * @swagger
     * /game:
     *  post:
     *    summary: Create a new game
     *    tags: [Games]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              name:
     *                type: string
     *              music:
     *                type: string
     *              note:
     *                type: string
     *              license_name:
     *                type: string
     *              email:
     *                type: string
     *            required:
     *              - name
     *              - license_name
     *              - email
     *    responses:
     *      201:
     *        description: Game created
     *      400:
     *        description: Missing required fields or license not found
     *      401:
     *        description: User not logged in
     *      500:
     *        description: Internal server error
     */
    const game = req.body;
    const userId = req.userData.id;
    const email = req.body.email;

    console.log("Received email:", email);

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

        // Envoyer l'email d'invitation
        const mailOptions = await sendInvitationEmail(email, createdGame.id);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Erreur lors de l'envoi de l'email:", error);
                return res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
            }
            console.log('Email d\'invitation envoyé avec succès');
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
    /**
     * @swagger
     * /game/{id}:
     *  put:
     *   summary: Update a game
     *  tags: [Games]
     * parameters:
     *  - in: path
     *   name: id
     *  required: true
     * description: ID of the game to update
     * 
     *
     */
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
    /**
 * Handles game deletion.
 *
 * @description
 * This function handles the deletion of an existing game.
 * It extracts the game id from the request parameters, then attempts to delete the game in the database.
 * If the game is successfully deleted, it sends a 204 No Content response.
 * In case of any unexpected errors, it sends a 500 Internal Server Error response.
 */
    const id = req.params.id;
    await gameDataMapper.deleteGame(id);

    res.status(204).send();
}

export const findGamesByUserId = async (req, res) => {
    /**
 * Handles games retrieval by user ID.
 *
 * @description
 * This function handles the localization of games by user id.
 * It extracts the user id from the request parameters, then attempts to find the games in the database
 * based on the provided id. If the games do not exist, it sends a 404 Not Found response with an appropriate error message.
 * If the games are found, it sends a 200 OK response with the games data.
 * In case of any unexpected errors, it sends a 500 Internal Server Error response.
 */
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    const games = await gameDataMapper.findGamesByUserId(userId);
    
    return res.status(200).json(games);
}

