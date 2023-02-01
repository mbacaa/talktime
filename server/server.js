const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');
const conversationsRoutes = require('./routes/conversations.js');
const messagesRoutes = require('./routes/messages.js');
const { register } = require('./controllers/auth.js');
const { updateUser } = require('./controllers/users.js');

/* CONFIG */
dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URL;
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(
	MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to MongoDB');
	}
);

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* UPLOADING PHOTOS */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

app.post('/api/auth/register', upload.single('pictureFile'), register);
app.post('/api/users/update', upload.single('pictureFile'), updateUser);

/* ROUTES */
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/messages', messagesRoutes);

/* LISTENING */
app.listen(PORT, () => {
	console.log('Backend is running... Port: ' + PORT + '');
});
