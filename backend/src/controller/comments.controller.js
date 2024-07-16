const { commentsService } = require('../service');
const { Comment } = require('../models');

const getAllC = async (_req, res) => {
  const allComents = await commentsService.getAllComments();
  if(!allComents) return (404).json({ message: 'Comentário não encontrado' }) 
    return res.status(200).json(allComents)
};

const addComment = async (req, res) => {
  const { productId } = req.params;
  const { clientId, comment } = req.body;

  try{
    const newComment = await Comment.create({ 
      productId,
      clientId,
      comment,
     });
  
     res.status(201).json(newComment);
  }catch(e){
    console.log(e.message)
    return res.status(500).json({ message: 'internal server error', e })
  }

}

module.exports = {
  getAllC,
  addComment,

}
  