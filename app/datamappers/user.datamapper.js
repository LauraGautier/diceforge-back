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

    async setPasswordResetToken(userId, token, expiry) {
        const query = 'UPDATE user SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3';
        await this.pool.query(query, [token, expiry, userId]);
    }

    async findUserByResetToken(token) {
        const query = 'SELECT * FROM user WHERE reset_password_token = $1 AND reset_password_expires > NOW()';
        const result = await this.pool.query(query, [token]);
        return result.rows[0] || null;
    }

    async updatePassword(userId, hashedPassword) {
        const query = 'UPDATE user SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2';
        await this.pool.query(query, [hashedPassword, userId]);
    }
}

export default UserDataMapper;