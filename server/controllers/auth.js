const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	try {
		const { username, email, password, picture } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			picture,
		});
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });
		if (!user) return res.status(400).json({ msg: 'User does not exist.' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;

		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { register, login };
