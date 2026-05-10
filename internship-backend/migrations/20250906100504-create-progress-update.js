'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProgressUpdates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      applicationId: {
        type: Sequelize.INTEGER,
        references: { model: 'Applications', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completionPercentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Completion percentage till now (0 to 100)'
      },
      progressDetails: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Description of how much progress has been done'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProgressUpdates');
  }
};