const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../../models');

const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const signToken = userId => jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
});

const register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw createError(400, 'name, email and password are required');
    }

    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
        throw createError(409, 'email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await user.create({
        name,
        email,
        password: hashedPassword,
    });

    if (!process.env.JWT_SECRET) {
        throw createError(500, 'JWT_SECRET is not configured');
    }

    const token = signToken(createdUser.id);

    return {
        user: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        },
        token,
    };
};

const login = async ({ email, password }) => {
    if (!email || !password) {
        throw createError(400, 'email and password are required');
    }

    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
        throw createError(401, 'invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatches) {
        throw createError(401, 'invalid credentials');
    }

    if (!process.env.JWT_SECRET) {
        throw createError(500, 'JWT_SECRET is not configured');
    }

    const token = signToken(foundUser.id);

    return {
        user: {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
        },
        token,
    };
};

module.exports = {
    register,
    login,
};
