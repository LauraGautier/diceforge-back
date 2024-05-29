class PasswordDataMapper {

    /**
     * @constructor
     * @param {Pool} pool - Pool de connexions PostgreSQL
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Trouve un utilisateur par son jeton de réinitialisation
     * @param {string} token - Le jeton de réinitialisation
     * @returns {Promise<object>} - Les détails de l'utilisateur trouvé
     */
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

    /**
     * Met à jour le mot de passe de l'utilisateur
     * @param {number} userId - L'ID de l'utilisateur
     * @param {string} hashedPassword - Le mot de passe haché
     * @returns {Promise<void>}
     */
    async updatePassword(userId, hashedPassword) {
        const query = 'UPDATE "user" SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2';
        try {
            await this.pool.query(query, [hashedPassword, userId]);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du mot de passe:', error);
            throw error;
        }
    }

    /**
     * Définit un jeton de réinitialisation de mot de passe pour l'utilisateur
     * @param {number} userId - L'ID de l'utilisateur
     * @param {string} token - Le jeton de réinitialisation
     * @param {Date} expiry - La date d'expiration du jeton
     * @returns {Promise<void>}
     */
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
