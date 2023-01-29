const express = require('express');
const {
	getUser,
	getAllUsers,
	updateUser,
	getFriends,
	addRemoveFriend,
} = require('../controllers/users.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);

router.get('/:id/friends', getFriends);
router.patch('/:id/:friendId', addRemoveFriend);

module.exports = router;
