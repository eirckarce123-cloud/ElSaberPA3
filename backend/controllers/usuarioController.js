const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const iniciarSesion = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: 'Ingresa el usuario y la contraseña'
            });
        }

        const usuarioEncontrado = await Usuario.findOne({ usuario });

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const passwordValida = await bcrypt.compare(
            password,
            usuarioEncontrado.password
        );

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            { id: usuarioEncontrado._id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            mensaje: 'Inicio de sesión correcto',
            token,
            usuario: usuarioEncontrado.usuario,
            nombre_completo: usuarioEncontrado.nombre_completo
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

module.exports = { iniciarSesion };