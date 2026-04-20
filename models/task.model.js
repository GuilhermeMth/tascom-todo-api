'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const task = sequelize.define('task', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER 
  },
  title: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Em andamento', 'Finalizado']]
    }
  },
  priority: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
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
    modelName: 'task',
});

module.exports = task;
