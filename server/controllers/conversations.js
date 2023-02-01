const Conversation = require('../models/Conversation.js');

const createConversation = async (req, res) => {
	try {
		const newConversation = new Conversation({
			members: [req.body.senderId, req.body.receiverId],
		});
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getConversation = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getPrivateConversation = async (req, res) => {
	try {
		const conversation = await Conversation.findOne({
			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	createConversation,
	getConversation,
	getPrivateConversation,
};
