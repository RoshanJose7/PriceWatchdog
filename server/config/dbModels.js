const mongoose = require('mongoose');

//DataBase Model
const UserData = mongoose.model('MyUserData', {
	link: {
		type: String,
		required: true,
		trim: true
	},
	lowerBound: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = UserData;
