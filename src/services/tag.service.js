const { tag, task } = require('../../models');
const { requireUserId } = require('./user.context');

const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const buildTagInclude = () => ([{
    model: task,
    as: 'tasks',
    through: { attributes: [] }
}]);

const listTags = async ({ userId: rawUserId } = {}) => {
    const userId = requireUserId({ userId: rawUserId });

    return tag.findAll({
        where: { userId },
        include: buildTagInclude(),
    });
};

const getTagById = async ({ userId: rawUserId, id }) => {
    const userId = requireUserId({ userId: rawUserId });
    const specificTag = await tag.findOne({
        where: { id, userId },
        include: buildTagInclude(),
    });

    if (!specificTag) {
        throw createError(404, 'Tag not found');
    }

    return specificTag;
};

const createTag = async ({ userId: rawUserId, name, color }) => {
    const userId = requireUserId({ userId: rawUserId });

    if (!name || !color) {
        throw createError(400, 'name and color are required');
    }

    return tag.create({ name, color, userId });
};

const updateTag = async ({ userId: rawUserId, id, name, color }) => {
    const userId = requireUserId({ userId: rawUserId });
    const specificTag = await tag.findOne({ where: { id, userId } });

    if (!specificTag) {
        throw createError(404, 'Tag not found');
    }

    await specificTag.update({
        name: name ?? specificTag.name,
        color: color ?? specificTag.color,
    });

    return specificTag;
};

const deleteTag = async ({ userId: rawUserId, id }) => {
    const userId = requireUserId({ userId: rawUserId });
    const deletedRows = await tag.destroy({
        where: { id, userId },
    });

    if (deletedRows === 0) {
        throw createError(404, 'Tag not found');
    }

    return { deletedRows };
};

module.exports = {
    listTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
};
