const route = require('express').Router();
const { productController } = require('../controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { authorizeRole } = require('../middlewares/authorizeRole');

route.get('/products', productController.getAllProduct);
route.get('/products/:id', productController.getProductsById);
route.get('/products/:category', productController.getPCategory);
route.post('/products', isAuthenticated, authorizeRole('admin'), productController.createProduct);
route.put('/products/:id', isAuthenticated, authorizeRole('admin'), productController.updateProduct);
route.delete('/products/:id', isAuthenticated, authorizeRole('admin'), productController.deleteProduct);

module.exports = route;
