
class GameDataMapper {

    constructor(pool) {
        this.pool = pool;
    }

    async findGameById(id) {
        const query = 'SELECT * FROM game WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async findGamesByUserId(userId) {
        const query = ` 
            SELECT game.*
            FROM game
            JOIN play ON game.id = play.game_id
            WHERE play.user_id = $1
            `;
        const result = await this.pool.query(query, [userId]);
        return result.rows;
    }

    async findAllUserEmail(email) {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const result = await this.pool.query(query, [email]);
        return result.rows;
    }

    async createGame(game, userId) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            const gameQuery = `
                INSERT INTO game (name, music, note, event, license_name, invitation_token) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *;
            `;
            const gameResult = await client.query(gameQuery, [
                game.name, 
                game.music, 
                game.note, 
                game.event, 
                game.license_name,
                game.invitation_token
            ]);
            const newGame = gameResult.rows[0];

            const role = 'gameMaster';
            const playQuery = `
                INSERT INTO play (role, user_id, game_id) 
                VALUES ($1, $2, $3);
            `;
            await client.query(playQuery, [role, userId, newGame.id]);

            await client.query('COMMIT');
            return newGame;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();   // Release the client back to the pool for no saturation
        }
    }
    
    async updateGame(game) {
        const fields = [];
        const values = [];
        let index = 1;

        if (game.name !== undefined) {
            fields.push(`name = $${index++}`);
            values.push(game.name);
        }
        if (game.music !== undefined) {
            fields.push(`music = $${index++}`);
            values.push(game.music);
        }
        if (game.note !== undefined) {
            fields.push(`note = $${index++}`);
            values.push(game.note);
        }
        if (game.event !== undefined) {
            fields.push(`event = $${index++}`);
            values.push(game.event);
        }

        fields.push(`updated_at = NOW()`);

        values.push(game.id);

        const query = `
            UPDATE game
            SET ${fields.join(', ')}
            WHERE id = $${index}
            RETURNING *;
        `;
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async deleteGame(id) {
        const deletePlayQuery = 'DELETE FROM play WHERE game_id = $1';
        const deleteGameQuery = 'DELETE FROM game WHERE id = $1';

        const client = await this.pool.connect();

        try {
            await client.query('BEGIN'); 

            await client.query(deletePlayQuery, [id]);

            await client.query(deleteGameQuery, [id]);

            await client.query('COMMIT'); 
        } catch (err) {
            await client.query('ROLLBACK'); 
            throw err; 
        } finally {
            client.release(); 
        }
    }

    async joinGame(gameId, userId) {
        const query = `
            INSERT INTO play (role, user_id, game_id) 
            VALUES ('player', $1, $2);
        `;
        await this.pool.query(query, [userId, gameId]);
    }

}

export default GameDataMapper;