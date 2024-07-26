const { Comment } = require('../models');

const getAllComments = async (productId) => {
  const comments = await Comment.findAll({
    where: { productId },
  });
  console.log("to aqui", productId)
  return comments;
};

module.exports = {
  getAllComments,
};
