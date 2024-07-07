const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Updated path

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  logo: {
    type: DataTypes.STRING
  },
  headerImage: {
    type: DataTypes.STRING
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
});

module.exports = Company;