const { Comment, Product, Client } = require('../models');

const getAllComments = async (productId) => {
  const comments = await Comment.findAll({
    where: { productId },
    include: [
      { model: Product, as: 'product' },
      { model: Client, as: 'client', attributes: ['fullName'] }
    ],
    attributes: ['comments']
  });
  return comments;
}

const createAComment = async(productId, comments, clientId) => {
  console.log('clientId:', clientId); 

  const newComment = await Comment.create({ productId, comments, clientId
   })

   const client = await Client.findByPk(clientId, {
    attributes: ['fullName']
   })
   return {
    ...newComment.get({ plain: true }),
    fullName: client ? client.fullName : null,
   }
}

module.exports = {
  getAllComments,
  createAComment,
};
