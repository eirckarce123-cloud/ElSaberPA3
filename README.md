# Biblioteca El Saber — PA3

## 1. Descripción del proyecto

El Saber es una aplicación web para la gestión de una biblioteca. Permite administrar libros, autores, editoriales, estudiantes y categorías mediante una interfaz desarrollada con Angular y una API REST construida con Node.js y Express.

## 2. Tecnologías utilizadas

- Angular y TypeScript para el frontend.
- Node.js y Express para el backend.
- MongoDB y Mongoose para la persistencia de datos.
- HTML y CSS para la estructura y presentación.
- HttpClient para la comunicación entre frontend y backend.

## 3. Módulos del sistema

- **Libros:** registrar, consultar, editar y eliminar libros.
- **Autores:** registrar, consultar, editar y eliminar autores.
- **Editoriales:** registrar, consultar, editar y eliminar editoriales.
- **Estudiantes:** registrar, consultar, editar y eliminar estudiantes.
- **Categorías:** registrar, consultar, editar y eliminar categorías.

## 4. Requisitos previos

- Node.js y npm instalados.
- Angular CLI instalado.
- Acceso a una base de datos MongoDB.
- Variables de entorno configuradas en el backend.

## 5. Ejecución del backend

Abrir una terminal en la carpeta `backend` y ejecutar:

```bash
npm install
node server.js
```

Verificar que el servidor inicie correctamente y se conecte a MongoDB.

## 6. Ejecución del frontend

Abrir otra terminal y ejecutar:

```bash
cd frontend
npm install
ng serve
```

Abrir en el navegador:

http://localhost:4200

## 7. Compilación para producción

Desde la carpeta `frontend`, ejecutar:

```bash
ng build
```

Los archivos compilados se generan en la carpeta `frontend/dist/frontend`.

## 8. Pruebas realizadas

Se verificó la compilación de Angular y el funcionamiento de las operaciones CRUD de los cinco módulos del sistema.

## 9. Consideraciones

El backend debe estar ejecutándose para que el frontend pueda consultar y modificar los datos. La conexión a MongoDB debe estar configurada mediante las variables de entorno correspondientes.
