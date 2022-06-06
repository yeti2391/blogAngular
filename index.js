'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3900;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test1').then(()=>{
    console.log('conexion a la base de datos exitosa');

    //crear servidor y ponerme a escuchar peticiones htpp
    app.listen(port, ()=>{
        console.log('Servidor corriendo en http://localhost:'+port); 
    })
});

