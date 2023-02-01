const Message = require('../models/Message');

const createMessage = async (req, res) => {
	try {
		const { sender, text, conversationId } = req.body;
		const newMessage = new Message({
			sender,
			text,
			conversationId,
		});
		const savedMessage = await newMessage.save();
		res.status(200).json(savedMessage);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(messages);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	createMessage,
	getMessages,
};
