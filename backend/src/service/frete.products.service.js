const { Product } = require('../models')

const getProductPerCategory = async (category) => {

  const productsPerCategory = await Product.findAll({ where: category })
  return productsPerCategory;
};

const getProductsPerPrice = async(price) => {
  const productsPerPrice = await Product.findAll({ where: price })
  return productsPerPrice;

}

const calcularFrete = (getProductPerCategory, getProductsPerPrice) => {
  const fretePadrao = 20
  const valorFreteGratis = 200

  if(getProductPerPrice >= valorFreteGratis){
    return 0
  }

  if(getProductPerCategory === 'electronics'){
    return fretePadrao + 10;
  }

  return fretePadrao
}




module.exports = {
  getProductPerCategory,
  getProductsPerPrice,
  calcularFrete,
}