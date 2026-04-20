const todoService = require('../services/todo.service');

const createTask = input => todoService.createTask(input);
const listTasks = input => todoService.listTasks(input);
const getTaskById = input => todoService.getTaskById(input);
const updateTask = input => todoService.updateTask(input);
const deleteTask = input => todoService.deleteTask(input);
const attachTagsToTask = input => todoService.attachTagsToTask(input);

module.exports = {
    createTask,
    listTasks,
    getTaskById,
    updateTask,
    deleteTask,
    attachTagsToTask,
};
