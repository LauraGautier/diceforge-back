class SheetDataMapper {
    constructor(pool) {
        this.pool = pool;
    }

    async findSheetByName(name) {
        const query = 'SELECT * FROM sheet WHERE name = $1';
        const result = await this.pool.query(query, [name]);
        return result.rows[0] || null;
    }

    async createSheet(sheet) {
        const query = `
            INSERT INTO sheet (name, image, class, level)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [sheet.name, sheet.image, sheet.class, sheet.level];
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
            fields.push(`level = $${index++}`);
            values.push(sheet.level);
        }

        fields.push(`updated_at = NOW()`);

        // Ajouter le nom à la fin des valeurs pour la clause WHERE
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
