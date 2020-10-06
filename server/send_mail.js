const nodemailer = require('nodemailer');
require('dotenv').config();

function send_mail(email, URL) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MYEMAIL,
			pass: process.env.PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.MYEMAIL,
		to: email,
		subject: ' The Price Fell Down ',
		text: ' Check the link now... \n ' + URL
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return error;
		} else {
			return 'Email sent: ' + info.response;
		}
	});
}

module.exports = send_mail;
