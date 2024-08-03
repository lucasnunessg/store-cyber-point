'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('comments', [{
  product_id: 1,
  client_id: 2,
  comments: 'Muito lindo!',
  },

])
  },

  async down (queryInterface, Sequelize) {
await queryInterface.bulkDelete('comments')
  }
};
