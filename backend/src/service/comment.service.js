const { Comment, Product } = require('../models');

const getAllComments =  async (productId) => {

  const comments = await Comment.findAll({
    where: { productId },
    include: { model: Product, as: 'product' },
    attributes: ['comments']

  });
  return comments
}

const createAComment = async(productId, comment) => {
  const newComment = await Comment.create({ productId, comment })

  return newComment
}

module.exports = {
  getAllComments,
  createAComment,
};
