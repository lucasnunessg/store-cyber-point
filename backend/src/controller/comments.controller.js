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
  const { comment } = req.body;
  try{
    const newComment = await commentsService.createAComment(productId, comment);
    if(!newComment) return res.status(400).json({ message: 'não foi possível criar' })
      return res.status(201).json(newComment);
  }catch(e){
    console.log(e.message)
    return res.status(500).json({ message: 'internal error service' })
  }
  
};

module.exports = {
  getAllC,
  addComment,
};
