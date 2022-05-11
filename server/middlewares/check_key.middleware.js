// Check if api key is correct
const check_key = (req, res, next) => {
	if (req.headers['x-noternal-api-key'] === process.env.API_KEY) {
		next();
	}
	else {
		res.send({ message: 'Access Denied.'})
	}
}

module.exports = check_key;