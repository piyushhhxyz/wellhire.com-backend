'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('OnlineAssessments');
    
    if (!table.CompanyId) {
      await queryInterface.addColumn('OnlineAssessments', 'CompanyId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }

    if (!table.CollegeId) {
      await queryInterface.addColumn('OnlineAssessments', 'CollegeId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Colleges',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }

    if (!table.UploaderId) {
      await queryInterface.addColumn('OnlineAssessments', 'UploaderId', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // We won't remove columns in the down migration to prevent data loss
  }
};