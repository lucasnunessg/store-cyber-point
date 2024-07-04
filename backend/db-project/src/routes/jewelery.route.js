const route = require('express').Router();
const { jeweleryController } = require('../controller');

route.get('/jewelery', jeweleryController.getAllJewelery);

module.exports = route;
