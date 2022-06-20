'use strict'

const express = require('express');
const ArticleController = require('../controllers/article');

const router = express.Router();


//Rutas de pruebas
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-curso', ArticleController.datosCurso);

//Rutas para articulos
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);



module.exports = router;