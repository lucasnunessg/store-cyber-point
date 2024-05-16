'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clients', [
      {
        full_name: 'Lucas Pacheco Nunes',
        address: 'Rua Acioli Vaz de Andrade, 51, Bairro Andrade',
        contact: '55999909852',
        email: 'lucasnunespacheco@dev.com',
        password: 'citytetra'
      },
      {
        full_name: 'Cristian Pacheco Nunes',
        address: 'Rua Bahia, 190, Bairro Independência',
        contact: '55 99999 9999',
        email: 'cristianpacheconunes@gmail.com',
        password: 'liveintexas'
      },
      {
        full_name: 'Eloisa Pacheco Nunes',
        address: 'Rua Acioli Vaz de Andrade, 51, Bairro Andrade',
        contact: '5599989990',
        email: 'eloisapnunes@gmail.com',
        password: '12345'
      },
      {
        full_name: 'Eli Fernando Marques Nunes',
        address: 'Rua Acioli Vaz de Andrade, 51, Bairro Andrade',
        contact: '5599922999',
        email: 'elinunes@gmail.com',
        password: '123456',
      },
      {
        full_name: 'Julia Trindade Modernel',
        address: 'Rua sei la, 53, Bairro não sei',
        contact: '55 992393992',
        email: 'juliatrindade@gmail.com',
        password: 'julia123'
      },
    ], {} );
  },

  async down(queryInterface, Sequelize) {
   
  await queryInterface.bulkDelete('clients', null, {});
     
  }
};
