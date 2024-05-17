
class GameDataMapper {

    constructor(pool) {
        this.pool = pool;
    }

    async findGameById(id) {
        const query = 'SELECT * FROM game WHERE id = $1';
        const result = await this.pool.query(query, [id]);
        return result.rows[0] || null;
    }

    async createGame(game) {
        const query = 'INSERT INTO game (name, music, note, event) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await this.pool.query(query, [game.name, game.music, game.note, game.event]);
        return result.rows[0];
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
        const query = 'DELETE FROM game WHERE id = $1';
        await this.pool.query(query, [id]);
    }
}

export default GameDataMapper;