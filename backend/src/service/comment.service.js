const { Comment, Product } = require('../models');


const getAllComments =  async (productId) => {

  const comments = await Comment.findOne({
    where: { productId },
    include: { model: Product, as: 'product' }
  });
  return comments
}

module.exports = {
  getAllComments,
};
