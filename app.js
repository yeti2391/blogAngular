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




// Ruta o metodo de prueba para la api
/* Esto fue copiado y pegado en controllers article.js
app.get('/datos-curso', (req, res)=>{
    return res.status(200).send({
        curso: 'Master en Frameworks JS',
        autor: 'Victor robles',
        url: 'victorrobles@web.es'
    })
});
LA RUTA ESTA DEFINIDO EN ROUTES AHORA
*/
// cargar ficheros rutas
const article_routes = require('./routes/article')

// a;adir prefijos a rutas
app.use('/api', article_routes);


// exportar modulo (fichero actual)
module.exports = app;