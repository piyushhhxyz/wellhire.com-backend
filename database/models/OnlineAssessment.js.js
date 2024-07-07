const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Updated path

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
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
});

module.exports = OnlineAssessment;