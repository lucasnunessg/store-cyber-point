const { Product } = require("../models")

const getProductsElectronics = async () => {
  try{
    const products = await Product.findAll({ where: { category: 'electronics' }, 
      attributes: ['title', 'price', 'description', 'category', 'image']  
    })
    
    return products;
  }catch(error){
    console.error("Erro ao buscar produto", error)
    throw error;
  }

}

module.exports = {
  getProductsElectronics,
}