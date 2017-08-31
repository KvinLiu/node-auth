const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	profileimage: {
		type: String
	}
});

const User = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
	newUser.save(callback);
};

module.exports = {User};

