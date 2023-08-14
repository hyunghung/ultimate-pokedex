const User = require('./User');
const Team = require('./team');

User.hasMany(Team, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Team.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Team };
