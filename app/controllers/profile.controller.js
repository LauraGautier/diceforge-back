import pool from '../../config/pg.config.js'; 
import ProfileDataMapper from '../datamappers/profile.datamapper.js';

const profileDataMapper = new ProfileDataMapper(pool);

export const getProfile = async (req, res) => {
    const profile = await profileDataMapper.getProfile();
    res.status(200).json(profile);
}

export const updateProfile = async (req, res) => {
    const profile = req.body;
    const updatedProfile = await profileDataMapper.updateProfile(profile);
    res.status(200).json(updatedProfile);
}