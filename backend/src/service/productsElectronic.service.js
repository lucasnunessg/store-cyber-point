const { Product } = require("../models");

const getProductsElectronics = async () => {
  
    const products = await Product.findAll({
      where: { category: 'electronics' },
      attributes: ['title', 'price', 'description', 'category', 'image']
    });
    
    
    return products;
  } 

module.exports = {
  getProductsElectronics,
};
