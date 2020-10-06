const mongoose = require('mongoose');
const URI = 'mongodb+srv://dbUser:dbUserPassword@userdata.dmwm7.mongodb.net/UserData?retryWrites=true&w=majority';

mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(console.log('Database Connected...'))
	.catch(err => console.log(err));
