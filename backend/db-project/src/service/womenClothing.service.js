const { Product } = require('../models')

const getWomenCloth = async () => {

  const products = await Product.findAll({ where: { category: 'women\'s clothing' } }) // precisa ter women\'s pro Sequelize conseguir ler a aspa
  
  
  return products;
  
}
module.exports = {
  getWomenCloth,
}