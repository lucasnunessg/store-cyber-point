const route = require('express').Router();
const { loginController } = require('../controller');
const { loginMiddleware } = require('../middlewares');

route.post('/login', loginMiddleware.validateLogin, 
loginController.loginClient
);

module.exports = route;