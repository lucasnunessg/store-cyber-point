const { mensClothingController } = require('../controller');
const route = require('express').Router();

route.get('/mens', mensClothingController.getAllProductsMens);

module.exports = route;