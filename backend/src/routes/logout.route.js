const route = require('express').Router();
const { logoutController } = require('../controller');

route.post('/logout', logoutController.logoutClient);

module.exports = route;