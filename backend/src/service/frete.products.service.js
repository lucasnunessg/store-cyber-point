const { Product } = require('../models')

const getProductPerCategory = async (category) => {

  const productsPerCategory = await Product.findAll({ where: { category } })
  return productsPerCategory;
};

const getProductsPerPrice = async(price) => {
  const productsPerPrice = await Product.findAll({ where: { price } })
  return productsPerPrice;

}

const calcularFrete = (productsPerCategory, productsPerPrice) => {
  const fretePadrao = 20
  const valorFreteGratis = 200
  console.log("eu to aqui, " , productsPerCategory)

const hasElectronics = productsPerCategory.some(product => product.category === 'electronics')
if(hasElectronics) {
  return fretePadrao + 10;
}
  
const priceComplete = productsPerPrice.reduce((total, product) => total + product.price, 0);

if (priceComplete >= valorFreteGratis) {
  return 0; 
}

return fretePadrao;
};




module.exports = {
  getProductPerCategory,
  getProductsPerPrice,
  calcularFrete,
}