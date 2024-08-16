const { freteService } = require('../service')

const valorFrete = (req, res) => {
  const { price, category } = req.body 
  try{
    const fretePreco = freteService.calcularFrete(price, category)
    if(!fretePreco) res.status(404).json({ message: 'não foi possível calcular frete' });
    return res.status(200).json({ frete: fretePreco })

  }catch(error){
    console.log("não foi possível calcular!", error)
  }
} //fazer as rotas e testar calculo do frete


module.exports = {
  valorFrete,
}