 class PasswordDataMapper {

    constructor(pool) {
        this.pool = pool;
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

    async setPasswordResetToken(userId, token, expiry) {
        const query = 'UPDATE user SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3';
        await this.pool.query(query, [token, expiry, userId]);
    }
 }

 export default PasswordDataMapper;
