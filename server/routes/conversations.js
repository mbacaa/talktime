const express = require('express');
const {
	createConversation,
	getConversation,
	getPrivateConversation,
} = require('../controllers/conversations.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/', verifyToken, createConversation);
router.get('/:userId', verifyToken, getConversation);
router.get(
	'/find/:firstUserId/:secondUserId',
	verifyToken,
	getPrivateConversation
);

module.exports = router;
