const jwt = require("jsonwebtoken");

// Check if user is already logged in
const auth = (req, res, next) => {
	const token = req.headers["authorization"]?.split(' ')[1];

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return res.json({ isLoggedIn: false,
									   message: "Failed to authenticate" });

			req.user = { id: decoded.id, username: decoded.username, email: decoded.email };
			next();
		})
	}
	else res.json({ message: "Incorrect token given", isLoggedIn: false });
}

module.exports = auth;