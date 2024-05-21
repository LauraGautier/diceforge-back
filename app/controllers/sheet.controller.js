import pool from '../../config/pg.config.js';
import SheetDataMapper from '../datamappers/sheet.datamapper.js';

const sheetDataMapper = new SheetDataMapper(pool);

export const getSheet = async (req, res) => {
    /**
     * Handles sheet retrieval by name.
     *
     * @description
     * This function handles the localization of a sheet by its name.
     * It extracts the sheet name from the request parameters, then attempts to retrieve the sheet from the database.
     * If the sheet is found, it sends a 200 OK response with the sheet data.
     * If the sheet is not found, it sends a 404 Not Found response with an appropriate error message.
     * In case of any unexpected errors, it sends a 500 Internal Server Error response.
     */
    const name = req.params.name;
    const sheet = await sheetDataMapper.findSheetByName(name);

    if (!sheet) {
        return res.status(404).json({ error: "La fiche n'existe pas." });
    }
    return res.status(200).json(sheet);
};

export const createSheet = async (req, res) => {
    /**
 * Handles sheet creation.
 *
 * @description
 * This function handles the creation of a new sheet.
 * It extracts the sheet data from the request body, then attempts to create the sheet in the database.
 * If the sheet is successfully created, it sends a 201 Created response with the created sheet data.
 * In case of any unexpected errors, it sends a 500 Internal Server Error response.
 */
    const sheet = req.body;
    const createdSheet = await sheetDataMapper.createSheet(sheet);

    res.status(201).json(createdSheet)
}

export const updateSheet = async (req, res) => {
    /**
     * Handles sheet update.
     * @description
     * This function handles the update of an existing sheet.
     * It extracts the sheet name from the request parameters and the updated sheet data from the request body.
     * It then attempts to update the sheet in the database.
     * If the sheet is successfully updated, it sends a 200 OK response with the updated sheet data.
     * If the sheet is not found, it sends a 404 Not Found response with an appropriate error message.
     * In case of any unexpected errors, it sends a 500 Internal Server Error response.
     */
    const name = req.params.name;
    const { image, class: className, level } = req.body; // we use alias to avoid conflict with reserved keyword 'class'

    const updatedSheet = await sheetDataMapper.updateSheetByName({ name, image, class: className, level });

    if (!updatedSheet) {
        return res.status(404).json({ error: "La fiche n'a pas été trouvée." });
    }

    res.status(200).json(updatedSheet);
};


export const deleteSheet = async (req, res) => {
    /**
 * Handles sheet deletion.
 *
 * @description
 * This function handles the deletion of an existing sheet.
 * It extracts the sheet id from the request parameters, then attempts to delete the sheet in the database.
 * If the sheet is successfully deleted, it sends a 204 No Content response.
 * In case of any unexpected errors, it sends a 500 Internal Server Error response.
 */
    const id = req.params.id;
    await sheetDataMapper.deleteSheet(id);

    res.status(204).send();
}