'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('OnlineAssessments', 'CompanyId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('OnlineAssessments', 'CollegeId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Colleges',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('OnlineAssessments', 'CompanyId');
    await queryInterface.removeColumn('OnlineAssessments', 'CollegeId');
    await queryInterface.removeColumn('OnlineAssessments', 'UploaderId');
  }
};