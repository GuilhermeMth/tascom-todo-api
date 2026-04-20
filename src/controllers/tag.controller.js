const tagService = require('../services/tag.service');

const listTags = input => tagService.listTags(input);
const getTagById = input => tagService.getTagById(input);
const createTag = input => tagService.createTag(input);
const updateTag = input => tagService.updateTag(input);
const deleteTag = input => tagService.deleteTag(input);

module.exports = {
    listTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
};