'use strict'

// cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

// ejecutar express (http)
const app = express();

// cargar ficheros rutas

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors (peticiones frontend)

// a;adir prefijos a rutas

// Ruta o metodo de prueba para la api
app.get('/datos-curso', (req, res)=>{
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Victor robles',
        url: 'victorrobles@web.es'
    })
});

// exportar modulo (fichero actual)
module.exports = app;