const route = require('express').Router();
const { productsElectronicsController } = require('../controller');

route.get('/products/electronics', productsElectronicsController.getProductsElectronics);

module.exports = route;