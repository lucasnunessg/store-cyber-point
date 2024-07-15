const { womenClothingService } = require('../service')

const getWomenCloth = async (req, res) => {
  try {
    const products = await womenClothingService.getWomenCloth();
    if(!products) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(200).json(products)
  }catch(error){
    console.error('Não foi possivel encontrar produto', error)
  }
}

module.exports = {
  getWomenCloth,
}