const route = require('express').Router();
const { womenClothingController } = require('../controller');

route.get('/women', womenClothingController.getWomenCloth);

module.exports = route;