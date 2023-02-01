const express = require('express');
const { createMessage, getMessages } = require('../controllers/messages.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/', createMessage);
router.get('/:conversationId', getMessages);

module.exports = router;
