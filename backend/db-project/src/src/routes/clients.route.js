const route = require('express').Router();
const { clientsController } = require('../controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

route.get('/clients', clientsController.getAllClient);
route.get('/clients/:id', isAuthenticated, clientsController.getClientById);
route.get('/clients/search/:id', clientsController.getClientByName);
route.post('/clients/', isAuthenticated, clientsController.createClient);
route.put('/clients/:id', isAuthenticated, clientsController.updateClient);
route.delete('/clients/:id', isAuthenticated, clientsController.deleteClient);

module.exports = route;