 import pool from '../../config/pg.config.js';
import SheetDataMapper from '../datamappers/sheet.datamapper.js';

const sheetDataMapper = new SheetDataMapper(pool);

export const getSheet = async (req, res) => {
    const name = req.params.name;
    const sheet = await sheetDataMapper.findSheetByName(name);

    if (!sheet) {
        return res.status(404).json({ error: "La fiche n'existe pas." });
    }
    return res.status(200).json(sheet);
};

export const createSheet = async (req, res) => {
    const sheet = req.body;
    const createdSheet = await sheetDataMapper.createSheet(sheet);

    res.status(201).json(createdSheet)
}

export const updateSheet = async (req, res) => {
    const name = req.params.name;
    const { image, class: className, level } = req.body; // we use alias to avoid conflict with reserved keyword 'class'

    const updatedSheet = await sheetDataMapper.updateSheetByName({ name, image, class: className, level });

    if (!updatedSheet) {
        return res.status(404).json({ error: "La fiche n'a pas été trouvée." });
    }
    res.status(200).json(updatedSheet);
};

export const deleteSheet = async (req, res) => {
    const id = req.params.id;
    await sheetDataMapper.deleteSheet(id);
    res.status(204).send();
}

export const getAllSheets = async (req, res) => {
    const sheets = await sheetDataMapper.findAllSheets();

    if (!sheets) {
        return res.status(404).json({ error: "Aucune fiche n'a été trouvée." });
    }
    return res.status(200).json(sheets);
}