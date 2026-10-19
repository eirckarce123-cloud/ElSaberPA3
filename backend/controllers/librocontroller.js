
const Libro = require('../models/Libro');

// Listar todos los libros
const listarLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los libros',
            error: error.message
        });
    }
};

// Registrar un libro
const registrarLibro = async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        const libroGuardado = await nuevoLibro.save();

        res.status(201).json(libroGuardado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al registrar el libro',
            error: error.message
        });
    }
};

// Editar un libro por su código
const editarLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.findOneAndUpdate(
            { codigo: req.params.codigo },
            req.body,
            { new: true, runValidators: true }
        );

        if (!libroActualizado) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            });
        }

        res.json(libroActualizado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al editar el libro',
            error: error.message
        });
    }
};

// Eliminar un libro por su código
const eliminarLibro = async (req, res) => {
    try {
        const libroEliminado = await Libro.findOneAndDelete({
            codigo: req.params.codigo
        });

        if (!libroEliminado) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            });
        }

        res.json({
            mensaje: 'Libro eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el libro',
            error: error.message
        });
    }
};

module.exports = {
    listarLibros,
    registrarLibro,
    editarLibro,
    eliminarLibro
};
