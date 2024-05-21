import pool from '../../config/pg.config.js'; // Importation du pool de connexions
import ProfileDataMapper from '../datamappers/profile.datamapper.js';

const profileDataMapper = new ProfileDataMapper(pool);

export const getProfile = async (req, res) => {
    /**
     * Handles profile retrieval.
     * 
     * @description
     * This function handles the retrieval of the profile.
     * It attempts to retrieve the profile from the database.
     * If the retrieval is successful, it sends a 200 OK response with the profile.
     * In case of any unexpected errors, it sends a 500 Internal Server Error response.
     * 
     */
    const profile = await profileDataMapper.getProfile();
    res.status(200).json(profile);
 
}

export const updateProfile = async (req, res) => {
    /**
     * Handles profile update.
     * 
     * @description
     * This function handles the update of the profile.
     * It extracts the profile data from the request body, then attempts to update the profile in the database.
     * If the update is successful, it sends a 200 OK response with the updated profile.
     * In case of any unexpected errors, it sends a 500 Internal Server Error response.
     * 
     */
    const profile = req.body;
    const updatedProfile = await profileDataMapper.updateProfile(profile);
    res.status(200).json(updatedProfile);
}