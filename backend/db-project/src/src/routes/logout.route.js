const route = require('express').Router();
const { isAuthenticated } = require('../middlewares');
const { logoutController } = require('../controller');

route.post('/logout', isAuthenticated, logoutController.logout);

module.exports = route;
