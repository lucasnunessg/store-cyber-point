const { commentsService } = require('../service');
const { Comment } = require('../models');

const getAllC = async (req, res) => {
  const { productId } = req.params;

  try {
    const allComments = await commentsService.getAllComments(productId);
    if (!allComments.length) {
      return res.status(404).json({ message: 'Comentários não encontrados' });
    }
    return res.status(200).json(allComments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

const addComment = async (req, res) => {
  const { productId } = req.params;
  const { clientId, comment } = req.body;

  try {
    const newComment = await Comment.create({
      productId,
      clientId,
      comment,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

module.exports = {
  getAllC,
  addComment,
};
