const authService = require('../services/auth.service');

const register = input => authService.register(input);
const login = input => authService.login(input);

module.exports = {
    register,
    login,
};
