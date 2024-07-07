const { Product } = require('../models');

const getAllProductsMens = async () => {
  const allProducts = await Product.findAll({ where: { category: 'men\'s clothing' } })
  return allProducts;
};


module.exports = {
  getAllProductsMens,
}