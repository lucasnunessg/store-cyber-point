const { productService } = require('../service');

const getAllProduct = async(req, res) => {
    try {
        const products = await productService.getAllProducts();
        if(!products) return res.status(404)
            .json({ message: 'Não foi possível encontrar produtos' })
        return res.status(200).json(products);
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Internal error server' })
    }
};

const getProductsById = async(req, res) => {
    try{
        const { id } = req.params
        const products = await productService.getProductsById(id);
        if(!products) return res.status(404).json({ message: 'Não foi possível encontrar' })
            return res.status(200).json(products)
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Internal error server' })
    }
}

module.exports = {
    getAllProduct,
    getProductsById,
}