const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const requireUserId = context => {
    const userId = context?.userId;

    if (!userId) {
        throw createError(401, 'authentication required');
    }

    return userId;
};

module.exports = {
    requireUserId,
};
