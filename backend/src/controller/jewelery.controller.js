const { jeweleryService } = require('../service');

const getAllJewelery = async (req, res) => {
  try{
    const products = await jeweleryService.getAllJewelery();
    if(!products) return res.status(404).json({ message: 'product not found' })
      return res.status(200).json(products);
  }catch(error){
    console.error("erro ao encontrar produto", error)
  }
}

module.exports = {
  getAllJewelery,
}