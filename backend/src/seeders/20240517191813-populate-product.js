const axios = require('axios').default

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { data } = await axios.get ('https://fakestoreapi.com/products/')
    const products = data.map(product => ({id:product.id, title:product.title, price:product.price,
       description:product.description, 
       category:product.category, 
       image:product.image}));
       
 await queryInterface.bulkInsert('products', products )
  },

  async down (queryInterface, Sequelize) {
await queryInterface.bulkDelete('products', null, {})
  }
};
