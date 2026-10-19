
const express = require('express');
const router = express.Router();

const {
    listarAutores,
    registrarAutor,
    editarAutor,
    eliminarAutor
} = require('../controllers/autorcontroller');

// Listar autores
router.get('/', listarAutores);

// Registrar un autor
router.post('/', registrarAutor);

// Editar un autor por DNI
router.put('/:dni', editarAutor);

// Eliminar un autor por DNI
router.delete('/:dni', eliminarAutor);

module.exports = router;

console.log('Rutas de autores cargadas');
