const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init(
  {
  },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Team;