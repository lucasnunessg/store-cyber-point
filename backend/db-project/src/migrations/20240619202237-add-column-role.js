'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('clients', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'client'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('clients', 'role');
  }
};
