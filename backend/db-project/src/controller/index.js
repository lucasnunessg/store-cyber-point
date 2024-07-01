const clientsController = require('./clients.controller');
const loginController = require('./login.controller');
const productController = require('./product.controller');
const logoutController = require('./logout.controller');
const productsElectronicsController = require('./productsElectronics.controller');
const womenClothingController = require('./womenClothing.controller');

module.exports = {
    clientsController,
    loginController,
    productController,
    logoutController,
    productsElectronicsController,
    womenClothingController,
};