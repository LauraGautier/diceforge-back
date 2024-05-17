class UserDataMapper {

    constructor(pool) {
        this.pool = pool;
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        try {
            const result = await this.pool.query(query, [email]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur par email:', error);
            throw error;
        }
    }

    async createUser(lastname, firstname, email, hashedPassword) {
        const query = 'INSERT INTO "user" (lastname, firstname, email, password) VALUES ($1, $2, $3, $4)';
        const values = [lastname, firstname, email, hashedPassword];
        try {
            await this.pool.query(query, values);
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            throw error;
        }
    }
}
export default UserDataMapper;