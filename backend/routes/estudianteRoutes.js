
const express = require('express');
const router = express.Router();

const {
    listarEstudiantes,
    registrarEstudiante,
    editarEstudiante,
    eliminarEstudiante
} = require('../controllers/estudianteController');

router.get('/', listarEstudiantes);
router.post('/', registrarEstudiante);
router.put('/:matricula', editarEstudiante);
router.delete('/:matricula', eliminarEstudiante);

module.exports = router;
