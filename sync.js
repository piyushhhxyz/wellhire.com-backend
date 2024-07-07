const sequelize = require('./config/database');
const { User, Company, College, OnlineAssessment } = require('./database/models');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate all tables
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();