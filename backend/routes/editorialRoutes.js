
const express = require('express');
const router = express.Router();

const {
    listarEditoriales,
    registrarEditorial,
    editarEditorial,
    eliminarEditorial
} = require('../controllers/editorialController');

router.get('/', listarEditoriales);
router.post('/', registrarEditorial);
router.put('/:ruc', editarEditorial);
router.delete('/:ruc', eliminarEditorial);

module.exports = router;
