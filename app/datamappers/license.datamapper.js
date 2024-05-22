class LicenseDataMapper {
     constructor(pool) {
        this.pool = pool;
    }
    async findLicenseByName(name) {
        const query = 'SELECT * FROM license WHERE name = $1';
        const result = await this.pool.query(query, [name]);
        return result.rows[0];
    }
    
    async getAllLicenses() {
    const query = 'SELECT * FROM license';
    const result = await this.pool.query(query);
    return result.rows;
}
}

export default LicenseDataMapper;