class SheetDataMapper {
    constructor(pool) {
        this.pool = pool;
    }

    async findSheetByName(name) {
        const query = 'SELECT * FROM sheet WHERE name = $1';
        const result = await this.pool.query(query, [name]);
        return result.rows[0] || null;
    }

    async findAllSheets() {
        const query = 'SELECT * FROM sheet';
        const result = await this.pool.query(query);
        return result.rows;
    }
    
    async createSheet(sheet) {
        if (!Number.isInteger(sheet.level) || !Number.isInteger(sheet.game_id)) {
            throw new Error('Invalid input: level and game_id must be integers');
        }

        const query = `
            INSERT INTO "sheet" (name, image, class, level, game_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [sheet.name, sheet.image, sheet.class, sheet.level, sheet.game_id];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async updateSheetByName(sheet) {
        const fields = [];
        const values = [];
        let index = 1;

        if (sheet.name !== undefined) {
            fields.push(`name = $${index++}`);
            values.push(sheet.name);
        }
        if (sheet.image !== undefined) {
            fields.push(`image = $${index++}`);
            values.push(sheet.image);
        }
        if (sheet.class !== undefined) {
            fields.push(`class = $${index++}`);
            values.push(sheet.class);
        }
        if (sheet.level !== undefined) {
            if (!Number.isInteger(sheet.level)) {
                throw new Error('Invalid input: level must be an integer');
            }
            fields.push(`level = $${index++}`);
            values.push(sheet.level);
        }

        fields.push(`updated_at = NOW()`);

        // Add the name at the end of the values for the WHERE clause
        values.push(sheet.name);

        const query = `
            UPDATE sheet
            SET ${fields.join(', ')}
            WHERE name = $${index}
            RETURNING *;
        `;
        const result = await this.pool.query(query, values);
        return result.rows[0] || null;
    }

    async deleteSheet(id) {
        const query = 'DELETE FROM sheet WHERE id = $1';
        await this.pool.query(query, [id]);
    }
}

export default SheetDataMapper;
