
const Categoria = require('../models/Categoria');

const listarCategorias = async (req, res) => {
    try {
        res.json(await Categoria.find());
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar categorías', error: error.message });
    }
};

const registrarCategoria = async (req, res) => {
    try {
        const categoria = new Categoria(req.body);
        res.status(201).json(await categoria.save());
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar categoría', error: error.message });
    }
};

const editarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findOneAndUpdate(
            { id_categoria: req.params.id_categoria }, req.body,
            { new: true, runValidators: true }
        );
        if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar categoría', error: error.message });
    }
};

const eliminarCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findOneAndDelete({
            id_categoria: req.params.id_categoria
        });
        if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar categoría', error: error.message });
    }
};

module.exports = {
    listarCategorias,
    registrarCategoria,
    editarCategoria,
    eliminarCategoria
};
