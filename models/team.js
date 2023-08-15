const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pokemon1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokemon2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokemon3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokemon4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokemon5: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokemon6: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'team',
  }
);

module.exports = Team;
