'use strict'

/*  
    Que son los controladores en el sistema MVC (modelo, vista controllador)?

    Una clase en la cual vamos a tener los distintos metodos y rutas relacionados con articulos de nuestra api.
    Se define el objeto y todos los metodos que va a tener

*/

const validator = require('validator');
const Article = require('../models/article');



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
    },

    save: (req, res)=>{
        // Recoger parametros por post
        const params = req.body;
        
        //validar datos(validator)
        try {
            //por alguna razon si cambio var por let/const no funciona
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error', 
                message: 'Faltan datos por enviar!'
            });
        }

        if (validate_title && validate_content) {
            // crear el objeto a guardar
            const article = new Article();

            // asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // guardar el articulos
            article.save( (err, articleStored)=>{
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado!'
                    });
                }
                 // devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    article:articleStored
                });
               
            });

           
        } else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!'
            });
        }
        

        /*
        return res.status(200).send({
            article: params
        })
        */
    },

    getArticles: (req, res)=>{
        //query
        const query = Article.find({});

        const last = req.params.last; 
        if(last || last != undefined){
            query.limit(5);
        }


        //Find
        query.sort('-_id').exec((err,articles)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos!'
                });
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });

    },

    getArticle: (req, res) =>{
        // tomar el id de la url
        const articleId = req.params.id;

        // comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo!'
            }); 
        }
        // buscar el articulo
        Article.findById(articleId, (err, article)=>{
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo!'
                }); 
            }

            // devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            }); 

        });
     

          
    }
    
};

module.exports = controller;