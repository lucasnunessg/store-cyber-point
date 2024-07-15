const route = require('express').Router();
const { loginController } = require('../controller');
const { loginMiddleware  } = require('../middlewares');
const { generateToken } = require('../middlewares/authToken')
 

route.post('/login',loginMiddleware.validateLogin, generateToken,
loginController.loginClient);

module.exports = route;