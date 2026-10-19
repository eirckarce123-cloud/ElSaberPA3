
const express = require('express');
const router = express.Router();

const {
    listarCategorias,
    registrarCategoria,
    editarCategoria,
    eliminarCategoria
} = require('../controllers/categoriaController');

router.get('/', listarCategorias);
router.post('/', registrarCategoria);
router.put('/:id_categoria', editarCategoria);
router.delete('/:id_categoria', eliminarCategoria);

module.exports = router;
