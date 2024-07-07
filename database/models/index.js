const User = require('./User');
const Company = require('./Company');
const College = require('./College');
const Subscription = require('./Subscription');
const OnlineAssessment = require('./OnlineAssessment.js');

// Define relationships
User.hasOne(Subscription);
Subscription.belongsTo(User);

Company.hasMany(OnlineAssessment);
OnlineAssessment.belongsTo(Company);

College.hasMany(OnlineAssessment);
OnlineAssessment.belongsTo(College);

User.hasMany(OnlineAssessment);
OnlineAssessment.belongsTo(User, { as: 'uploader' });

module.exports = {
  User,
  Company,
  College,
  OnlineAssessment,
  Subscription
};