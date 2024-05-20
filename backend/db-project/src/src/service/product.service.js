const { Product } = require('../models');

const getAllProducts = async () => {
    const products = await Product.findAll();

    return products
};

const getProductsById = async(id) => {
    const products = await Product.findOne({ where: { id } });

    return products;
}

module.exports = {
    getAllProducts,
    getProductsById,
}