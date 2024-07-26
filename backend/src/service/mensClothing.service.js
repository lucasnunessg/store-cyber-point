const { Product } = require('../models');

const getAllProductsMens = async () => {
  
  const allProducts = await Product.findOne({ where: { category: 'men\'s clothing' } })

  return allProducts;
};


module.exports = {
  getAllProductsMens,
}