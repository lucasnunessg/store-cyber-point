const { Product } = require('../models')

const getWomenCloth = async () => {

  const products = await Product.findAll({ where: { category: 'women\'s clothing' } }) 
  
  return products;
  
}
module.exports = {
  getWomenCloth,
}