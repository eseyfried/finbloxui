'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
    });
    await queryInterface.addColumn('Users', 'licenseType', {
        type: Sequelize.ENUM({
            values: ['trial', 'pro']
        }),
        allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: true
    });
    await queryInterface.removeColumn('Users', 'licenseType',)
  }
};
