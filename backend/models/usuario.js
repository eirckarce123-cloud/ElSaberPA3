
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre_completo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
