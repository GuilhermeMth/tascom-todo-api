const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const handle = (handler, successStatus = 200) => async (req, res) => {
    try {
        const data = await handler({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        return res.status(successStatus).json({
            status: 'success',
            data,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message || 'Unexpected error',
        });
    }
};

router.post('/register', handle(authController.register, 201));
router.post('/login', handle(authController.login));

module.exports = router;
