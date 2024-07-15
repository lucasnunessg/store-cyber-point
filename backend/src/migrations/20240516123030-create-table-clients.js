'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable('clients', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullName: {
    type: Sequelize.STRING,
    field: 'full_name',
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
  },
  contact: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clients')
  }
};
