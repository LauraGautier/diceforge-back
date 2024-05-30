import pool from '../../config/pg.config.js';
import GameDataMapper from '../datamappers/game.datamapper.js';
import LicenseDataMapper from '../datamappers/license.datamapper.js';
import { sendInvitationEmail, transporter } from '../../config/nodemailer.config.js';
import 'dotenv/config';

const gameDataMapper = new GameDataMapper(pool);
const licenseDataMapper = new LicenseDataMapper(pool);


export const getGame = async (req, res) => {
    /**
 * Handles game retrieval by ID.
 *
 * @description
 * This function handles the localization of a game by its id.
 * It extracts the game id from the request parameters, then attempts to find the game in the database
 * based on the provided id. If the game does not exist, it sends a 404 Not Found response with an appropriate error message.
 * If the game is found, it sends a 200 OK response with the game data.
 * In case of any unexpected errors, it sends a 500 Internal Server Error response.
 */
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
     * Handles game update.
     *  @description
     * This function handles the update of an existing game.
     * It extracts the game id from the request parameters and the updated game data from the request body.
     * Then it attempts to update the game in the database based on the provided id.
     * If the game is successfully updated, it sends a 200 OK response with the updated game data.
     * If the game is not found, it sends a 404 Not Found response with an appropriate error message.
     * In case of any unexpected errors, it sends a 500 Internal Server Error response.
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

