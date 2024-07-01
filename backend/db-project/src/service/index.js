const clientService = require('./client.service');
const loginService = require('./login.service');
const productService = require('./product.service');
const productElectronicService = require('./productsElectronic.service')
const womenClothingService = require ('./womenClothing.service')

module.exports = {
    clientService,
    loginService,
    productService,
    productElectronicService,
    womenClothingService,
}