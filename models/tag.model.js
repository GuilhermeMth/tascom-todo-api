'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const tag = sequelize.define('tag', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
}, {
  paranoid: false,
  freezeTableName: true,
  modelName: 'tag',
});

module.exports = tag;