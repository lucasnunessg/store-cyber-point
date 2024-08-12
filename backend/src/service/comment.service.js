const { Comment, Product, Client } = require('../models');

const getAllComments = async (productId) => {
  const comments = await Comment.findAll({
    where: { productId },
    include: { model: Product, as: 'product' , model: Client, as: 'client', attributes: ['clientId']},
    attributes: ['comments', 'fullName']
  });
  return comments;
}

const createAComment = async(productId, comments, clientId) => {
  const newComment = await Comment.create({ productId, comments, clientId,
    include: { model: Product, as: 'product', model: Client, as: 'client' },
    attributes: ['fullName']
   })

  return newComment
}

module.exports = {
  getAllComments,
  createAComment,
};
