const clientService = require('./client.service');
const loginService = require('./login.service');
const productService = require('./product.service');
const productElectronicService = require('./productsElectronic.service');
const womenClothingService = require ('./womenClothing.service');
const jeweleryService = require('./jewelery.service')
const menClothingService = require('./mensClothing.service');
const commentsService = require('./comment.service');
const freteService = require('./frete.products.service');


module.exports = {
    clientService,
    loginService,
    productService,
    productElectronicService,
    womenClothingService,
    jeweleryService,
    menClothingService,
    commentsService,
    freteService,
}