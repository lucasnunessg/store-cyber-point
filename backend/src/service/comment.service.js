const { Comment, Product } = require('../models');

const getAllComments =  async (productId) => {

  const comments = await Comment.findAll({
    where: { productId },
    include: { model: Product, as: 'product' },
    attributes: ['comments']

  });
  return comments
}

module.exports = {
  getAllComments,
};
