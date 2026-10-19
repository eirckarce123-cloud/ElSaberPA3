
const Estudiante = require('../models/Estudiante');

const listarEstudiantes = async (req, res) => {
    try {
        res.json(await Estudiante.find());
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar estudiantes', error: error.message });
    }
};

const registrarEstudiante = async (req, res) => {
    try {
        const estudiante = new Estudiante(req.body);
        res.status(201).json(await estudiante.save());
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar estudiante', error: error.message });
    }
};

const editarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOneAndUpdate(
            { matricula: req.params.matricula }, req.body,
            { new: true, runValidators: true }
        );
        if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json(estudiante);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar estudiante', error: error.message });
    }
};

const eliminarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findOneAndDelete({ matricula: req.params.matricula });
        if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json({ mensaje: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar estudiante', error: error.message });
    }
};

module.exports = {
    listarEstudiantes,
    registrarEstudiante,
    editarEstudiante,
    eliminarEstudiante
};
