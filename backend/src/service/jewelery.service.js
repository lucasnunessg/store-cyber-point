const { Product } = require('../models')

const getAllJewelery = async () => {
  const products = Product.findOne({ where: { category: 'jewelery' } })
  return products
};

module.exports = {
  getAllJewelery
}