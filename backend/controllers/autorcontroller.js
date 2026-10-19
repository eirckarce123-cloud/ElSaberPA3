
const Autor = require('../models/autor');

// Listar todos los autores
const listarAutores = async (req, res) => {
    try {
        const autores = await Autor.find();
        res.json(autores);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los autores',
            error: error.message
        });
    }
};

// Registrar un autor
const registrarAutor = async (req, res) => {
    try {
        const nuevoAutor = new Autor(req.body);
        const autorGuardado = await nuevoAutor.save();

        res.status(201).json(autorGuardado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al registrar el autor',
            error: error.message
        });
    }
};

// Editar un autor por su DNI
const editarAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.findOneAndUpdate(
            { dni: req.params.dni },
            req.body,
            { new: true, runValidators: true }
        );

        if (!autorActualizado) {
            return res.status(404).json({
                mensaje: 'Autor no encontrado'
            });
        }

        res.json(autorActualizado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al editar el autor',
            error: error.message
        });
    }
};

// Eliminar un autor por su DNI
const eliminarAutor = async (req, res) => {
    try {
        const autorEliminado = await Autor.findOneAndDelete({
            dni: req.params.dni
        });

        if (!autorEliminado) {
            return res.status(404).json({
                mensaje: 'Autor no encontrado'
            });
        }

        res.json({
            mensaje: 'Autor eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el autor',
            error: error.message
        });
    }
};

module.exports = {
    listarAutores,
    registrarAutor,
    editarAutor,
    eliminarAutor
};
