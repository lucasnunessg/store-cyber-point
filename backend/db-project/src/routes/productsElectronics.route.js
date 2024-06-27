const route = require('express').Router();
const { productsElectronicsController } = require('../controller');

route.get('/electronics', productsElectronicsController.getProductsElectronics);

module.exports = route;