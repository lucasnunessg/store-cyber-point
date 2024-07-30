const route = require('express').Router();
const { commentsController } = require('../controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

route.get('/products/comments', commentsController.addComment);

route.post('/products/:productId/:comments', isAuthenticated, commentsController.addComment);

module.exports = route;
