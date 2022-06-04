const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const check_key = require('./middlewares/check_key.middleware');
const MockMongoose = require('mock-mongoose').MockMongoose;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mockMongoose = new MockMongoose(mongoose);
const ENVIRONMENT = 'prod';

// MIDDLESWARES
app.use(express.json(),
		cors(),
		bodyParser.urlencoded({extended: true}),
		bodyParser.json(),
		check_key);

// MONGODB CONNECTION
const uri = process.env.ATLAS_URI;

if(ENVIRONMENT === 'dev') {
	mockMongoose.prepareStorage()
		.then(() => {
			mongoose.connect(uri, () => {
				useNewUrlParser: true;
				useCreateIndex: true;
				useUnifiedTopology: true;
			});

			const connection = mongoose.connection;

			connection.once('connected', () => {
				console.log('\x1b[33m[MOCK]\x1b[0m MongoDB database connection is established.\n');
			});

			process.emitWarning("\x1b[33mDevelopment environment.\x1b[0m");
		});
}
else {
	mongoose.connect(uri, () => {
		useNewUrlParser: true;
		useCreateIndex: true;
		useUnifiedTopology: true;
	});

	const connection = mongoose.connection;

	connection.once('open', () => {
		console.log('MongoDB database connection is established.');
	});
}

// ROUTES
const UserRouter = require('./routes/user.route');
const NoteRouter = require('./routes/note.route');
const UtilityRouter = require('./routes/utility.route');

app.use('/user', UserRouter);
app.use('/note', NoteRouter);
app.use('/utility', UtilityRouter);

app.listen(port,() => {
	console.log(`\nServer is running in port: \x1b[32m${port}\x1b[0m\n`);
})

// Shows server is reachable
app.get("/", (req, res) => {
	res.send("<html><head><title>Noternal API</title></head><body>200 OK</body></html>");
})

exports.app = app;
exports.ENVIRONMENT = ENVIRONMENT;