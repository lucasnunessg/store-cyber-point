const route = require('express').Router();
const { commentsController } = require('../controller')

route.get('/comments', commentsController.getAllC);
route.post('/products/:comments', commentsController.addComment)