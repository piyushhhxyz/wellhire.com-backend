const sequelize = require('./db');
const { User, Company, College, CompanyCollege, Subscription } = require('./models');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Be careful with {force: true} in production
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = syncDatabase;