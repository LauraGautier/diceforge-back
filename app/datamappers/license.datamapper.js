class LicenseDataMapper {
     constructor(client) {
        this.client = client;
    }
    async findLicenseByName(name) {
        const query = 'SELECT * FROM license WHERE name = $1';
        const result = await this.client.query(query, [name]);
        return result.rows[0];
    }
    
    async getAllLicenses() {
    const query = 'SELECT * FROM license';
    const result = await this.client.query(query);
    return result.rows;
}
}

export default LicenseDataMapper;