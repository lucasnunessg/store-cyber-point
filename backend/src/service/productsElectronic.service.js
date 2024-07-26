const { Product } = require("../models");

const getProductsElectronics = async () => {
  
    const products = await Product.findOne({
      where: { category: 'electronics' },
      attributes: ['title', 'price', 'description', 'category', 'image']
    });
    
    
    return products;
  } 

module.exports = {
  getProductsElectronics,
};
