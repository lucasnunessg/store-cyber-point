const { Product } = require('../models');

const getAllProducts = async () => {
    const products = await Product.findAll();

    return products
};

const getProductsById = async(id) => {
    const products = await Product.findOne({ where: { id } });

    return products;
};

const createProduct = async(title, price, description, category, image) => {
    const newProduct = await Product.create(title, price, description, category, image);

    return newProduct;
};

const updateProduct = async(id, title, price, description, category, image) => {
    const [updateRows] = await Product.update({
        id, title, price, description, category, image}, { where: {
            id
        }}
    );
    return updateRows;
};

const deleteProduct = async(id) => {
    const deleteProduct = await Client.destroy({ where: { id } });

    return deleteProduct;
};

module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
}