class LicenseDataMapper {
     constructor(pool) {
        this.pool = pool;
    }
    async findLicenseByName(name) {
        const query = 'SELECT * FROM license WHERE name = $1';
        const result = await this.pool.query(query, [name]);
        return result.rows[0] || null;
    }
}

export default LicenseDataMapper;