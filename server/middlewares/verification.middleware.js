const jwt = require("jsonwebtoken");
let User = require('./../models/user.model');

// Check if user is verified
const verification = (req, res, next) => {
	User.findById(req.user.id)
		.then(user => {
			if (user.verification.verified) next();
			else return res.json({ message: "Account not verified." });
		});
}

module.exports = verification;