const route = require('express').Router();
const { productController } = require('../controller');

route.get('/products', productController.getAllProduct);
route.get('/products/:id', productController.getProductsById);
route.post('/products', productController.createProduct);
route.put('/products/:id', productController.updateProduct);
route.delete('/products/:id', productController.deleteProduct);
module.exports = route;