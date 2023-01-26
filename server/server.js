const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

/* CONFIG */
dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URL;

const app = express();
const router = express.Router();

mongoose.connect(
	MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to MongoDB');
	}
);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

/* UPLOADING/STORING FILES */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
});
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
	try {
		return res.status(200).json('File uploaded successfully');
	} catch (err) {
		console.error(err);
	}
});

/* ROUTES */
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/conversations', require('./routes/conversations'));
// app.use('/api/messages', require('./routes/messages'));

/* LISTENING */
app.listen(PORT, () => {
	console.log('Backend is running... Port: ' + PORT + '');
});
