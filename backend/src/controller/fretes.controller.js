const { freteService } = require('../service');

const valorFrete = async (req, res) => {
  const { price, category } = req.body;

  const priceNumber = parseFloat(price);

  if(isNaN(priceNumber)) {
    return res.status(400).json({ message: 'O preço deve ser um número válido.' })
  }

  try {
    const productsPerCategory = await freteService.getProductPerCategory(category);
    const productsPerPrice = await freteService.getProductsPerPrice(price);

    const fretePreco = freteService.calcularFrete(productsPerCategory, productsPerPrice);
    if (fretePreco === undefined || isNaN(fretePreco)) {
      return res.status(404).json({ message: 'Não foi possível calcular o frete' });
    }

    return res.status(200).json({ frete: fretePreco });

  } catch (error) {
    console.error("Não foi possível calcular o frete:", error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  valorFrete,
};
