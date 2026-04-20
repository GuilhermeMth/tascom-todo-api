const { task, tag, sequelize } = require('../../models');
const { requireUserId } = require('./user.context');

const allowedStatuses = ['Em andamento', 'Finalizado'];

const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const parseList = value => {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value.flatMap(item => String(item).split(','));
    }

    return String(value).split(',');
};

const normalizeTagIds = value => parseList(value).map(Number).filter(Number.isInteger);
const normalizeTagNames = value => parseList(value).map(item => item.trim()).filter(Boolean);

const buildTaskInclude = () => ([{
    model: tag,
    as: 'tags',
    through: { attributes: [] }
}]);

const filterTasksByTags = (tasks, tagIds, tagNames) => {
    if (!tagIds.length && !tagNames.length) {
        return tasks;
    }

    return tasks.filter(taskItem => {
        const taskTags = taskItem.tags || [];

        const matchesIds = tagIds.length === 0 || tagIds.every(tagId =>
            taskTags.some(tagItem => tagItem.id === tagId)
        );

        const matchesNames = tagNames.length === 0 || tagNames.every(tagName =>
            taskTags.some(tagItem => tagItem.name === tagName)
        );

        return matchesIds && matchesNames;
    });
};

const validateStatus = status => !status || allowedStatuses.includes(status);

const attachTags = async (taskInstance, tagIds, userId, transaction) => {
    if (!tagIds.length) {
        return;
    }

    const tagsToAttach = await tag.findAll({
        where: {
            id: tagIds,
            userId,
        },
        transaction,
    });

    if (tagsToAttach.length !== tagIds.length) {
        throw createError(400, 'One or more tags were not found');
    }

    await taskInstance.setTags(tagsToAttach, { transaction });
};

const createTask = async ({ userId: rawUserId, title, status, priority, description, tagIds = [] }) => {
    const userId = requireUserId({ userId: rawUserId });

    if (!title || !status || !description) {
        throw createError(400, 'title, status and description are required');
    }

    if (!validateStatus(status)) {
        throw createError(400, "status must be 'Em andamento' or 'Finalizado'");
    }

    const transaction = await sequelize.transaction();

    try {
        const newTask = await task.create({
            title,
            status,
            priority,
            description,
            userId,
        }, { transaction });

        await attachTags(newTask, normalizeTagIds(tagIds), userId, transaction);

        await transaction.commit();

        return task.findByPk(newTask.id, {
            include: buildTaskInclude(),
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const listTasks = async ({ userId: rawUserId, tagIds = [], tags = [] } = {}) => {
    const userId = requireUserId({ userId: rawUserId });
    const tasks = await task.findAll({
        where: { userId },
        include: buildTaskInclude(),
    });

    return filterTasksByTags(tasks, normalizeTagIds(tagIds), normalizeTagNames(tags));
};

const getTaskById = async ({ userId: rawUserId, id }) => {
    const userId = requireUserId({ userId: rawUserId });
    const specificTask = await task.findOne({
        where: { id, userId },
        include: buildTaskInclude(),
    });

    if (!specificTask) {
        throw createError(404, 'Task not found');
    }

    return specificTask;
};

const updateTask = async ({ userId: rawUserId, id, title, status, priority, description, tagIds }) => {
    const userId = requireUserId({ userId: rawUserId });

    if (status && !validateStatus(status)) {
        throw createError(400, "status must be 'Em andamento' or 'Finalizado'");
    }

    const transaction = await sequelize.transaction();

    try {
        const specificTask = await task.findOne({ where: { id, userId }, transaction });

        if (!specificTask) {
            throw createError(404, 'Task not found');
        }

        await specificTask.update({
            title: title ?? specificTask.title,
            status: status ?? specificTask.status,
            priority: priority ?? specificTask.priority,
            description: description ?? specificTask.description,
        }, { transaction });

        if (tagIds !== undefined) {
            await attachTags(specificTask, normalizeTagIds(tagIds), userId, transaction);
        }

        await transaction.commit();

        return task.findByPk(id, {
            include: buildTaskInclude(),
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const deleteTask = async ({ userId: rawUserId, id }) => {
    const userId = requireUserId({ userId: rawUserId });
    const deletedRows = await task.destroy({
        where: { id, userId },
    });

    if (deletedRows === 0) {
        throw createError(404, 'Task not found');
    }

    return { deletedRows };
};

const attachTagsToTask = async ({ userId: rawUserId, id, tagIds }) => {
    const userId = requireUserId({ userId: rawUserId });
    const transaction = await sequelize.transaction();

    try {
        const specificTask = await task.findOne({ where: { id, userId }, transaction });

        if (!specificTask) {
            throw createError(404, 'Task not found');
        }

        await attachTags(specificTask, normalizeTagIds(tagIds), userId, transaction);

        await transaction.commit();

        return task.findByPk(id, {
            include: buildTaskInclude(),
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    createTask,
    listTasks,
    getTaskById,
    updateTask,
    deleteTask,
    attachTagsToTask,
};
