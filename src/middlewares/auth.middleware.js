const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'authentication required'
        });
    }

    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                status: 'error',
                message: 'JWT_SECRET is not configured'
            });
        }

        const token = authorization.slice(7);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.userId };
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'invalid token'
        });
    }
};

module.exports = authMiddleware;
