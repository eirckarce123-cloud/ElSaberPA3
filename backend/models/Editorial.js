
const mongoose = require('mongoose');

const editorialSchema = new mongoose.Schema({
    ruc: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Editorial', editorialSchema);
