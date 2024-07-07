const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CompanyCollege = sequelize.define('CompanyCollege', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    pdfUrl: {
        type: DataTypes.STRING
    }
});

module.exports = CompanyCollege;