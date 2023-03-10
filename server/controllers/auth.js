const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailSender = require('../utils/mail/mailSender');

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
		await emailSender.signupMail(email, user._id.toString());
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const verifyEmail = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}
		user.emailVerified = true;
		await user.save();
		res.status(200).json({ message: 'User verified.' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });
		if (!user) return res.status(400).json({ msg: 'User does not exist.' });
		if (!user.emailVerified) {
			return res.status(400).json({ msg: 'Email not verified.' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;

		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { register, login, verifyEmail };
