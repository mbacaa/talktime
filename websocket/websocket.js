const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

const io = require('socket.io')(PORT, {
	cors: {
		origin: ORIGIN,
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
	socket.on('addUser', (userId) => {
		addUser(userId, socket.id);
		io.emit('getUsers', users);
	});

	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
	});

	socket.on('disconnect', () => {
		removeUser(socket.id);
		io.emit('getUsers', users);
	});
});
