const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const handle = (handler, successStatus = 200) => async (req, res) => {
	try {
		const data = await handler({
			userId: req.user?.id,
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

router.use(authMiddleware);

router.post('/', handle(todoController.createTask, 201));
router.get('/', handle(todoController.listTasks));
router.get('/:id', handle(todoController.getTaskById));
router.put('/:id', handle(todoController.updateTask));
router.delete('/:id', handle(todoController.deleteTask));
router.post('/:id/tags', handle(todoController.attachTagsToTask));

module.exports = router;