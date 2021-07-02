'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      userIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        field: 'user_index',
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'location_id',
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'date_of_birth',
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: new Date(),
      },
    });

    await queryInterface.addIndex('users', ['user_index']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
