'use strict'

/*  
    Que son los controladores en el sistema MVC (modelo, vista controllador)?

    Una clase en la cual vamos a tener los distintos metodos y rutas relacionados con articulos de nuestra api.
    Se define el objeto y todos los metodos que va a tener

*/

const controller = {
    datosCurso: (req, res)=>{
        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Victor robles',
            url: 'victorrobles@web.es'
        });
    },

    test: (req, res)=>{
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        });
    }
    
};

module.exports = controller;