const { Product } = require('../models')

const getWomenCloth = async () => {

  const products = await Product.findOne({ where: { category: 'women\'s clothing' } }) 
  
  return products;
  
}
module.exports = {
  getWomenCloth,
}