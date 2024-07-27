const { commentsService } = require('../services');
const { Comment, Client } = require('../models');


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
  const { comment } = req.body;
  const clientId = req.user.id;

  if (!comment || comment.trim() === '') {
    return res.status(400).json({ message: 'Não é permitido comentário vazio' });
  }

  try {
    const newComment = await Comment.create({
      productId: parseInt(productId, 10),
      clientId,
      comment,
    });

    const commentWithClient = await Comment.findOne({
      where: { id: newComment.id },
      include: [{ model: Client, attributes: ['fullName'] }],
    });

    res.status(201).json(commentWithClient);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
};

module.exports = {
  getAllC,
  addComment,
};
