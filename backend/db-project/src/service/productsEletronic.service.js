const { Product } = require("../models")

const getProductsEletronics = async (category) => {
  try{
    const products = await Product.findAll({ where: { category } 
    })
  }catch(error){
    console.error("Erro ao buscar produto", error)
  }

}

module.exports = {
  getProductsEletronics,
}