const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true,
		trim: true
	},
	lastname: {
		type: String,
		required: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	verification: {
		type: Object,
	}
}, {
	timestamps: true
});

const User = mongoose.model('user', userSchema);

module.exports = User;