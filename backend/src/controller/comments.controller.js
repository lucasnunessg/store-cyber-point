const { commentsService } = require('../service');
const { Comment } = require('../models');


const getAllC = async (req, res) => {
  try {
    const { productId } = req.params;  
    const allComments = await commentsService.getAllComments(productId); 
    console.log(allComments)
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
  const { comments } = req.body;

  if (!comments) {
    return res.status(400).json({ message: 'Não é permitido comentário vazio' });
  }
  
  try {
    const newComment = await Comment.create({
      productId: parseInt(productId, 10),
    });

    const commentWithClient = await Comment.findOne({
      where: { id: newComment.id },
      include: [
        { model: Product, as: 'product', attributes: ['title'] } 
      ],
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
