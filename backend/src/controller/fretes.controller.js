const { getProductPerCategory, getProductsPerPrice, calcularFrete } = require('../services/freteService');

const valorFrete = async (req, res) => {
  const { price, category } = req.body;

  try {
    const productsPerCategory = await getProductPerCategory(category);
    const productsPerPrice = await getProductsPerPrice(price);

    const fretePreco = calcularFrete(productsPerCategory, productsPerPrice);

    if (fretePreco === undefined) {
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
