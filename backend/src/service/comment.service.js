const { Comment } = require('../models/comments');

const getAllComments = async () => {
  const comments = await Comment.findAll({ where: { id } });
  return comments;
};



module.exports = {
  getAllComments,
}