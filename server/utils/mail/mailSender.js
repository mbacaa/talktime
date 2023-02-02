const { transporter, mailData } = require('./mailConfig');
const { createMessage } = require('./verifyMailTemplate');

const signupMail = async (receiver, _id) => {
	const mailTemplate = {
		...mailData,
		to: receiver,
		html: createMessage(_id),
	};

	try {
		await transporter.sendMail(mailTemplate);
		return { message: 'Mail sent', status: 200 };
	} catch (error) {
		console.log(error.message);
		return { message: error.message, status: 500 };
	}
};

module.exports = { signupMail };
