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
      const sampleUsersCount = 100;
      const insertData = [{
        id: 'constant-user-id',
        location_id: 1,
        first_name: faker.name.firstName(1),
        last_name: faker.name.lastName(1),
        date_of_birth: faker.datatype.datetime({ min: 315532800000, max: 946684800000 }),
        picture: faker.image.avatar(),
      }];
  
      for (let i = 0; i < sampleUsersCount; i++) {
        const randGender = Math.round(Math.random() * 10) % 2;
        const randLocationId = Math.round(Math.random() * 10) % 10;
  
        insertData.push({
          id: faker.datatype.uuid(),
          location_id: randLocationId,
          first_name: faker.name.firstName(randGender),
          last_name: faker.name.lastName(randGender),
          date_of_birth: faker.datatype.datetime({ min: 315532800000, max: 946684800000 }),
          picture: faker.image.avatar(),
        });
      }

      await queryInterface.bulkInsert('users', insertData);
    } catch (error) {
      console.log('Failed to seed fake users', error);
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
