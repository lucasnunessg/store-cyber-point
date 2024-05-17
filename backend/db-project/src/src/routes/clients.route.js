const route = require('express').Router();
const { clientsController } = require('../controller');

route.get('/clients', clientsController.getAllClient);

module.exports = route;