
const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
    dni: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    anio_nacimiento: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Autor', autorSchema);
