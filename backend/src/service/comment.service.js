const { Comment } = require('../models');

const getAllComments = async (productId) => {
  const comments = await Comment.findPyPk(productId);
  return comments;
};

// Incorrect integer value: 'productId' for column 'product_id' at row 1 - dando isso ao fazer o post no front

module.exports = {
  getAllComments,
};
