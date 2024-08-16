const { Product } = require('../models')

const getProductPerCategory = async () => {

  const productsPerCategory = await Product.findAll({ where: 'category' })
  return productsPerCategory;
};

const getProductsPerPrice = async() => {
  const productsPerPrice = await Product.findAll({ where: 'price' })
  return productsPerPrice;

}

const calcularFrete = (getProductPerCategory, getProductsPerPrice) => {
  const fretePadrao = 20
  const valorMinFrete = 200
}

module.exports = {
  getProductPerCategory,
  getProductsPerPrice,
}