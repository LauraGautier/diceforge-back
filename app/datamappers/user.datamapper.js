class UserDataMapper {

    constructor(pool) {
        this.pool = pool;
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM user WHERE email = $1';
        const result = await this.pool.query(query, [email]);
        return result.rows[0] || null;
    }
    async createUser(email, lastname, firstname, hashedPassword) {
        const query = 'INSERT INTO user (email, lastname, firstname, password) VALUES ($1, $2, $3, $4)';
        const values = [email, lastname, firstname, hashedPassword];
        await this.pool.query(query, values);
    }
}

export default UserDataMapper;