const route = require('express').Router();
const { logoutController } = require('../controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

route.post('/logout', isAuthenticated, logoutController.logoutClient);