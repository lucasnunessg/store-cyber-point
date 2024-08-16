const route = require('express').Router();
const { freteController } = require('../controller');

route.post('/calcular-frete', freteController.valorFrete);

module.exports = route;