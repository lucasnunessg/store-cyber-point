const route = require('express').Router();
const { commentsController } = require('../controller')

router.get('/products/:id/comments', commentsController.getAllC);

router.post('/products/:id/comments', commentsController.addComment);
