const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getUserByUsername = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: err.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email, password, picture } = req.body;
		const user = await User.findById(id);
		const salt = await bcrypt.genSalt(10);
		if (username) user.username = username;
		if (email) user.email = email;
		if (password) {
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}
		if (picture) user.picture = picture;
		await user.save();

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(200).json({ token, user });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		const friends = await User.find({ _id: { $in: user.friends } });
		res.status(200).json(friends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({ _id, username, email, friends, picture }) => {
				return { _id, username, email, friends, picture };
			}
		);
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	getUser,
	getAllUsers,
	updateUser,
	getFriends,
	addRemoveFriend,
	getUserByUsername,
};
