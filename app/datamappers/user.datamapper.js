class UserDataMapper {

    constructor(pool) {
        this.pool = pool;
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const result = await this.pool.query(query, [email]);
        return result.rows[0] || null;
    }

    async createUser(lastname, firstname, email, hashedPassword) {
        const query = 'INSERT INTO "user" (lastname, firstname,email, password ) VALUES ($1, $2, $3, $4)';
        const values = [ lastname, firstname, email, hashedPassword ];
        await this.pool.query(query, values);
    }
}

export default UserDataMapper;