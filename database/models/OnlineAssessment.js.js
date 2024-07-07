const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const OnlineAssessment = sequelize.define('OnlineAssessment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CompanyId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  CollegeId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  UploaderId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
});

module.exports = OnlineAssessment;