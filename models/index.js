'use strict';

const sequelize = require('../config/database');
const task = require('./task.model');
const tag = require('./tag.model');
const user = require('./user.model');

user.hasMany(task, {
  as: 'tasks',
  foreignKey: 'userId',
});

user.hasMany(tag, {
  as: 'tags',
  foreignKey: 'userId',
});

task.belongsTo(user, {
  as: 'user',
  foreignKey: 'userId',
});

tag.belongsTo(user, {
  as: 'user',
  foreignKey: 'userId',
});

task.belongsToMany(tag, {
  through: 'task_tags',
  as: 'tags',
  foreignKey: 'taskId',
  otherKey: 'tagId'
});

tag.belongsToMany(task, {
  through: 'task_tags',
  as: 'tasks',
  foreignKey: 'tagId',
  otherKey: 'taskId'
});

module.exports = {
  sequelize,
  user,
  task,
  tag,
};
