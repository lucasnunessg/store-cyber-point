const { Product } = require('../models')

const getProductPerCategory = async (category) => {

  const productsPerCategory = await Product.findAll({ where: { category } })
  return productsPerCategory;
};

const getProductsPerPrice = async(price) => {
  const productsPerPrice = await Product.findAll({ where: { price } })
  console.log("return aqui" , productsPerPrice)
  return productsPerPrice;

}

const calcularFrete = (productsPerCategory, productsPerPrice) => {
  const fretePadrao = 20
  const valorFreteGratis = 200
  console.log("aquiii --- service", productsPerPrice)

  if (productsPerCategory === 'electronics') {
    return fretePadrao +10;
  }
  
  if (productsPerPrice >= valorFreteGratis) {
  return 0
}


  return fretePadrao
}




module.exports = {
  getProductPerCategory,
  getProductsPerPrice,
  calcularFrete,
}