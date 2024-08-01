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
};

const getPCategory = async(req, res) => {
  try{
    const { category } = req.params;
    const pCategory = await productService.getProductByCategory(category);
    if(!pCategory) return res.status(404).json({ message: 'Product not found' })
      return res.status(200).json(pCategory)
  }catch(e){
    console.log(e.message)
    return res.status(500).json({ message: 'internal error server' })
  }
}

const updateProduct = async(req, res) => {
    try{
        const { id } = req.params;
        const { title, price, description, image } = req.body;
        const updateProduct = await productService.updateProduct(id, title, price,
        description, image);
        
        if(!updateProduct) return res.status(404)
            .json({ message: 'Não foi possível atualizar produto' })
        return res.status(200).json(updateProduct);
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Internal error server' })
    };
};

const createProduct = async(req, res) => {
    try{
        const { title, price, description, image, category, role } = req.body
        const newProduct = await productService
        .createProduct(title, price, description, image, category, role);
        if(!newProduct) return res.status(404).json({ message: 'Erro ao criar produto' })
        return res.status(201).json(newProduct)
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Internal error server' })
    }
};

const deleteProduct = async(req, res) => {
    try{
        const { id } = req.params;
        await productService.deleteProduct(id)
        return res.status(200).json({ message: 'produto deletado com sucesso' })
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: 'Internal error server' })
    }
}

module.exports = {
    getAllProduct,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
    getPCategory,
}