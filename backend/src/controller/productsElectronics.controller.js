const { productElectronicService } = require('../service'); 

const getProductsElectronics = async (req, res) => {
  try {
    const products = await productElectronicService.getProductsElectronics();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erro interno de servidor.' });
  }
};

module.exports = {
  getProductsElectronics,
};
