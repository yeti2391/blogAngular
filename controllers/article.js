'use strict'

/*  
    Que son los controladores en el sistema MVC (modelo, vista controllador)?

    Una clase en la cual vamos a tener los distintos metodos y rutas relacionados con articulos de nuestra api.
    Se define el objeto y todos los metodos que va a tener

*/

const validator = require('validator');
const Article = require('../models/article');
const fs = require('fs');
const path = require('path');
const { exists } = require('../models/article');


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
    },

    update: (req, res) =>{
        // recoger el id del articulo por la url
        const articleId = req.params.id;

        // recoger los datos que llegan por el put
        const params = req.body;


        // validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar!'
            }); 
        }

        if( validate_title && validate_content){
             // find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar!'
                    }); 
                }
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulos!'
                    }); 
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated 
                }); 
            });
        } else{
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            }); 
        }        
    },

    delete: (req, res)=>{
        // recoger el id de la url
        const articleId = req.params.id;

        // find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                }); 
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no exista'
                }); 
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });    
    },

    upload: (req, res)=>{
        // Configurar el modulo connect multiparty router/article.js (hecho)

        // recoger el ficher de la peticion
        const file_error = 'Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_error
            });
        }

        // conseguir el nombre y la extension del archivo
        const file_path = req.files.file0.path;
        const file_split = file_path.split('/');

        //nombre del archivo
        const file_name = file_split[2];
        //extension del archivo
        const extension_split = file_name.split('\.');2
        const file_ext = extension_split[1];

        // comprobar la extension, solo imagenes, si no es valida borrar el fihcero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
        //borrar el archivo si no cumple requisito de extensiones
        fs.unlink(file_path, (err)=>{
            return res.status(404).send({
                status: 'error',
                message: 'La extension de la imagen no es valida'
            }); 
        });
        } else{
            // si es valido, se saca id de la url
            const articleId = req.params.id;
            // buscar el articulo, asignarle nombre de la imagen y actualizar
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated)=>{
                if(err || !articleUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del articulo'
                    });  
                }
               
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                }); 
            });
        }
    },//end upload file

    getImage: (req, res) =>{
        const file = req.params.image;
        const path_file = './upload/articles/'+ file;

        fs.exists(path_file, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe' 
                }); 
            }
        });         
    },
    
};

module.exports = controller;