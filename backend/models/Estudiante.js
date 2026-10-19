
const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    matricula: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
