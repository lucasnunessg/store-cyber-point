const route = require('express').Router();
const { clientsController } = require('../controller');

route.get('/clients', clientsController.getAllClient);
route.get('/clients/:id', clientsController.getClientById);
route.post('/clients/', clientsController.createClient);
route.put('/clients/:id', clientsController.updateClient);
route.delete('/clients/:id', clientsController.deleteClient);

module.exports = route;