const route = require('express').Router();
const { commentsController } = require('../controller');
const { loginMiddleware } = require('../middlewares');

route.get('/products/:productId/comments', commentsController.getAllComments);

route.post('/products/:productId/comments', loginMiddleware.validateLogin, commentsController.addComment);
