const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
	port: 465,
	host: 'smtp.gmail.com',
	auth: {
		user: 'talktime.ug@gmail.com',
		pass: process.env.MAIL_PASS,
	},
});

const mailData = {
	from: 'talktime.ug@gmail.com',
	subject: 'Potwierdzenie rejestracji',
};

module.exports = { transporter, mailData };
