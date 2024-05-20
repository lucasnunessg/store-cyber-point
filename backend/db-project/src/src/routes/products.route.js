const route = require('express').Router();
const { productController } = require('../controller');

route.get('/products', productController.getAllProduct);

module.exports = route;