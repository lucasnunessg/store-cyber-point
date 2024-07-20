const { Comment } = require('../models/comments');

const getAllComments = async () => {
  const comments = await Comment.findAll();
  return comments;
};



module.exports = {
  getAllComments,
}