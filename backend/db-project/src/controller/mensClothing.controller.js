const { menClothingService } = require('../service');

const getAllProductsMens = async (req, res) => {
  try{
    const allProducts = await menClothingService.getAllProductsMens();
    if(!allProducts) return res.status(404).json({ message: 'Product not found' })
      return res.status(200).json(allProducts);
  }catch(error){
    return res.status(500).json({ message: 'internal error server' })
  }
}

module.exports = {
  getAllProductsMens,
}