'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");

module.exports = {
  async up (queryInterface, Sequelize) {
    const seedDate = moment().format("YYYY-MM-DD H:mm:ss");

    await queryInterface.bulkDelete('Groups', null, {truncate:true});
    
    await queryInterface.bulkInsert('Groups', [
        { name: 'access', createdAt: seedDate, updatedAt: seedDate },
        { name: 'publish', createdAt: seedDate, updatedAt: seedDate },
        { name: '$authenticated', createdAt: seedDate, updatedAt: seedDate },
        { name: 'trial', createdAt: seedDate, updatedAt: seedDate },
        { name: 'pro', createdAt: seedDate, updatedAt: seedDate },
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Groups', null, {truncate:true});
  }
};
