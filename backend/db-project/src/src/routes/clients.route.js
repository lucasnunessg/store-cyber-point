const route = require('express').Router();
const { clientsController } = require('../controller');
const { isAuthenticated } = require('../middlewares/isAuthenticate');

route.get('/clients', clientsController.getAllClient);
route.get('/clients/:id', isAuthenticated, clientsController.getClientById);
route.get('/clients/search/:id', clientsController.getClientByName);
route.post('/clients/', clientsController.createClient);
route.put('/clients/:id', clientsController.updateClient);
route.delete('/clients/:id', clientsController.deleteClient);

module.exports = route;