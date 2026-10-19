
const express = require('express');
const router = express.Router();

const {
    listarLibros,
    registrarLibro,
    editarLibro,
    eliminarLibro
} = require('../controllers/librocontroller');

// Listar todos los libros
router.get('/', listarLibros);

// Registrar un libro
router.post('/', registrarLibro);

// Editar un libro por su código
router.put('/:codigo', editarLibro);

// Eliminar un libro por su código
router.delete('/:codigo', eliminarLibro);

module.exports = router;
