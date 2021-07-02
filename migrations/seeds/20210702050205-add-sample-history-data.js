'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      const mainUserIndex = 1;

      const mockHistoryData = [
        {
          user_index: 4,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 7,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 10,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 15,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 20,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 22,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 25,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
        {
          user_index: 30,
          action_id: 1,
          target_user_index: mainUserIndex,
        },
      ]

      await queryInterface.bulkInsert('user_histories', mockHistoryData);
    } catch (error) {
      console.log('Failed to insert fake user history data', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
