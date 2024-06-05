class PasswordDataMapper {
    
    constructor(pool) {
        this.pool = pool;
    }

    async findUserByResetToken(token) {
        const query = 'SELECT * FROM "user" WHERE reset_password_token = $1 AND reset_password_expires > NOW()';
        try {
            const result = await this.pool.query(query, [token]);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur par token de réinitialisation:', error);
            throw error;
        }
    }

    async updatePassword(userId, hashedPassword) {
        const query = 'UPDATE "user" SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2';
        try {
            await this.pool.query(query, [hashedPassword, userId]);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe:', error);
            throw error;
        }
    }

    async setPasswordResetToken(userId, token, expiry) {
        const query = 'UPDATE "user" SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3';
        try {
            await this.pool.query(query, [token, expiry, userId]);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du token de réinitialisation:', error);
            throw error;
        }
    }
}

export default PasswordDataMapper;
