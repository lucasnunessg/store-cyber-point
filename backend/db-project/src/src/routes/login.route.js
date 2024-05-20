const route = require('express').Router();
const { loginController } = require('../controller');
const { loginMiddleware  } = require('../middlewares');
const { decodeToken } = require('../middlewares/authToken')
 

route.post('/login', loginMiddleware.validateLogin, 
loginController.loginClient, decodeToken
);

module.exports = route;