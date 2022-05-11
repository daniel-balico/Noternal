const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	note: {
		type: String,
		required: true,
		trim: true
	},
	color: {
		type: String,
		required: true,
		trim: true
	},
	owner: {
		type: mongoose.Types.ObjectId,
		required: true
	}
}, {
	timestamps: true
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;