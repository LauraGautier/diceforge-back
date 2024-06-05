import pool from '../../config/pg.config.js';
import LicenseDataMapper from '../datamappers/license.datamapper.js';

const licenseDataMapper = new LicenseDataMapper(pool);

export const getAllLicenses = async (req, res) => {
    const licenses = await licenseDataMapper.getAllLicenses();
    res.status(200).json(licenses);
};
