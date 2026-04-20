const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const todoRoutes = require('./todo.routes');
const tagRoutes = require('./tag.routes');

router.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'API is running'
	});
});

router.use('/auth', authRoutes);
router.use('/todo', todoRoutes);
router.use('/tags', tagRoutes);

module.exports = router;