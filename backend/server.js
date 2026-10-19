
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const libroRoutes = require('./routes/libroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const editorialRoutes = require('./routes/editorialRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de libros
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/editoriales', editorialRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/usuarios', usuarioRoutes);

console.log('Ruta de usuarios cargada');

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de ElSaber funcionando correctamente'
    });
});



// Iniciar servidor y conectar la base de datos
const iniciarServidor = async () => {
    await conectarDB();

    app.listen(PORT, () => {
        console.log(`Servidor ElSaber ejecutándose en el puerto ${PORT}`);
    });
};

iniciarServidor();
