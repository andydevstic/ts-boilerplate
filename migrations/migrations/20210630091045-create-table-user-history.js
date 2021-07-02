'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_histories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_index',
      },
      actionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'action_id',
      },
      targetUserIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'target_user_index',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: new Date(),
      },
    });

    // Boost performance for user's history page, and to easily find the last userIndex that a user has viewed.
    await queryInterface.sequelize.query(`
      CREATE INDEX user_histories_user_index_desc_action_id ON user_histories(user_index ASC, target_user_index DESC, action_id ASC)
    `);
    // await queryInterface.addIndex('user_histories', ['user_index', 'action_id']);

    // Boost performance for pair matching feature; 
    await queryInterface.addIndex('user_histories', ['target_user_index', 'action_id', 'user_index']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_histories');
  }
};
