const { Product } = require("../models");

const getAllProducts = async () => {
  const products = await Product.findAll();

  return products;
};

const getProductsById = async (id) => {
  const products = await Product.findOne({ where: { id } });

  return products;
};

const getProductByCategory = async(category) => {
  const pCategory = await Product.findOne({ where: { category } })

  return pCategory;
}

const createProduct = async (title, price, description, image, category) => {
  const newProduct = await Product.create({ title, price, description, image, category});

  return newProduct;
};

const updateProduct = async (id, title, price, description, image) => {
  const [updateRows] = await Product.update(
    {
      id,
      title,
      price,
      description,
      image,
    },
    {
      where: {
        id,
      },
    }
  );
  return updateRows;
};

const deleteProduct = async (id) => {
  const deleteProduct = await Product.destroy({ where: { id } });

  return deleteProduct;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
};
