
const Editorial = require('../models/editorial');

const listarEditoriales = async (req, res) => {
    try {
        res.json(await Editorial.find());
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar editoriales', error: error.message });
    }
};

const registrarEditorial = async (req, res) => {
    try {
        const editorial = new Editorial(req.body);
        res.status(201).json(await editorial.save());
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar editorial', error: error.message });
    }
};

const editarEditorial = async (req, res) => {
    try {
        const editorial = await Editorial.findOneAndUpdate(
            { ruc: req.params.ruc }, req.body,
            { new: true, runValidators: true }
        );
        if (!editorial) return res.status(404).json({ mensaje: 'Editorial no encontrada' });
        res.json(editorial);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar editorial', error: error.message });
    }
};

const eliminarEditorial = async (req, res) => {
    try {
        const editorial = await Editorial.findOneAndDelete({ ruc: req.params.ruc });
        if (!editorial) return res.status(404).json({ mensaje: 'Editorial no encontrada' });
        res.json({ mensaje: 'Editorial eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar editorial', error: error.message });
    }
};

module.exports = {
    listarEditoriales,
    registrarEditorial,
    editarEditorial,
    eliminarEditorial
};
