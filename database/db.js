const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wellhire_db', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;