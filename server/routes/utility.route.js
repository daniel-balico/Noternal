const router = require('express').Router();
const bcrypt = require('bcrypt');
const axios = require('axios');


router.route('/sendcode').post((req, res) => {
	const { firstname, email, code } = req.body;

	// Send verification code to email
	axios.post('https://api.emailjs.com/api/v1.0/email/send', {
		service_id: process.env.SERVICE_ID,
		template_id: process.env.TEMPLATE_ID,
		user_id: process.env.USER_ID,
		accessToken: process.env.ACCESS_TOKEN,
		template_params: { name: firstname, email: email, code: code }
	});
})

router.route('/encrypt').post(async (req, res) => {
	const input = req.body.input;

	const result = await bcrypt.hash(String(input), 10);

	res.json({ success: true, result: result});
})

router.route('/compare').post(async (req, res) => {
	const { x, y } = req.body;

	bcrypt.compare(x, y)
		  .then(isCorrect => {
		  	if (isCorrect) res.json({ success: true, match: true })
		  	else 		   res.json({ success: true, match: false })
		  })
		  .catch(err => res.json({ success: false, message: err.message }))
})

module.exports = router;
