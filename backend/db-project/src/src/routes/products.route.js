const route = require('express').Router();
const { productController } = require('../controller');

route.get('/products', productController.getAllProduct);
route.get('/products/:id', productController.getProductsById);

module.exports = route;