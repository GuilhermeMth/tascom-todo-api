const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
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

router.post('/', handle(tagController.createTag, 201));
router.get('/', handle(tagController.listTags));
router.get('/:id', handle(tagController.getTagById));
router.put('/:id', handle(tagController.updateTag));
router.delete('/:id', handle(tagController.deleteTag));

module.exports = router;