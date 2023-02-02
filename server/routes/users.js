const express = require('express');
const {
	getUser,
	getUserByUsername,
	getAllUsers,
	updateUser,
	deleteUser,
	getFriends,
	addRemoveFriend,
} = require('../controllers/users.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.get('/find/:username', verifyToken, getUserByUsername);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

router.get('/:id/friends', getFriends);
router.patch('/:id/:friendId', addRemoveFriend);

module.exports = router;
