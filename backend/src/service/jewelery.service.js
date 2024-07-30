const { Product } = require('../models')

const getAllJewelery = async () => {
  const products = Product.findAll({ where: { category: 'jewelery' } })
  return products
};

module.exports = {
  getAllJewelery
}