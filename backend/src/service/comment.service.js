const { Comment, Product } = require('../models');

const getAllComments = async () => {
  const comments = await Comment.findAll({
    include: { model: Product, as: 'product' },
    attributes: ['comments']
  });
  return comments;
}

const createAComment = async(productId, comments) => {
  const newComment = await Comment.create({ productId, comments,
    include: { model: Product, as: 'product' },
   })

  return newComment
}

module.exports = {
  getAllComments,
  createAComment,
};
