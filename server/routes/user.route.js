const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

// MIDDLEWARES
const auth = require('./../middlewares/auth.middleware');

// MODELS
let User = require('./../models/user.model');

router.route('/signin').post((req, res) => {
	const { username, password } = req.body;

	User.findOne({username: username})
		.then(query => {
			if (!query) return res.json({ message: "Invalid username or password.",
								  			success: false })
			else {
				bcrypt.compare(password, query.password)
					  .then(isCorrect => {
					  	if (isCorrect) {
				  			const payload = { id: query._id, username: query.username, email: query.email }

					  		jwt.sign(
					  			payload,
					  			process.env.JWT_SECRET,
					  			{expiresIn: 86400},
					  			(err, token) => {
					  				if (err) return res.json({ message: err });

					  				return res.json({ message: "Signin success.",
								  					  token: "Bearer " + token,
								  					  verified: query.verification.verified,
								  					  success: true }) });
					  	}
					  	else return res.json({ message: "Invalid username or password.", 
					  				      	   success: false });
					  });
			}
		})
});

router.route('/signup').post(async (req, res) => {
    const { firstname, lastname,
    		email, username, password } = req.body;

    // If email or username is already exist in the database
    const takenEmail = await User.findOne({ email: email });
    const takenUsername = await User.findOne({ username: username });

    if (takenEmail || takenUsername) res.send({ message: "Email or username already exist.", 
    											success: false});
    else {
    	const encrypted_password = await bcrypt.hash(password, 10);

    	const random_number = Math.floor(Math.random() * 9999) + 1000;	// Generates a 4 digit number

    	verification = { verified: false, code: random_number }

    	const user = new User({ firstname, lastname, verification,
					    		email: email.toLowerCase(), 
					    		username: username.toLowerCase(), 
					    		password: encrypted_password });
    
    	user.save(error => {
            if(error) 
            	res.send({ message: "Encountered an error.", 
            			   error: error, 
            			   success: false });
            else 
            	res.send({ message: "Signup success.", 
            			   success: true });
        });

        // Send verification code to email for verification
    	axios.post('https://api.emailjs.com/api/v1.0/email/send', {
    		service_id: process.env.SERVICE_ID,
    		template_id: process.env.TEMPLATE_ID,
    		user_id: process.env.USER_ID,
    		accessToken: process.env.ACCESS_TOKEN,
    		template_params: { name: firstname, email: email, code: random_number }
    	});
    }
});

router.route('/verification').post(auth, async (req, res) => {
	const code = req.body.code;

	User.findById(req.user.id)
	 	.then(user => {
		 	if(parseInt(code) === parseInt(user.verification.code)) {

		 		const verification = { verified: true }

		 		user.verification = verification;

		 		user.save()
			 		.then(() => res.json({ message: "User verified.", 
			 			  				   success: true }))

					.catch(err => res.json({ message: "Encountered an error.", 
						 				     error: err, 
						 				     success: false }));
			}
			else res.json({ message: "Incorrect code.", 
						   success: false });
	 	})
});

router.route('/details/:type/:data').get((req, res) => {
	const type = req.params.type;
	const data = req.params.data;

	if(type === 'id') {
		User.findById(data)
			.then(user => {
				res.json({ success: true, id: user.id, 
						   firstname: user.firstname, 
						   lastname: user.lastname, 
						   email: user.email, 
						   username: user.username, 
						   verified: user.verification.verified});
			})
			.catch(() => res.json({success: false, message: 'User not found.'}))
	}
	else if(type === 'email') {
		User.findOne({ email: data})
			.then(user => {
				res.json({ success: true, id: user.id, 
						   firstname: user.firstname, 
						   lastname: user.lastname, 
						   email: user.email, 
						   username: user.username, 
						   verified: user.verification.verified});
			})
			.catch(() => res.json({success: false, message: 'User not found.'}))
	}
	else if (type === 'username') {
		User.findOne({username: data})
			.then(user => {
				res.json({ success: true, id: user.id, 
						   firstname: user.firstname, 
						   lastname: user.lastname, 
						   email: user.email, 
						   username: user.username, 
						   verified: user.verification.verified});
			})
			.catch(() => res.json({success: false, message: 'User not found.'}))
	}
	else {
		res.json({success: false, message: 'Invalid type.'});
	}
	
})

router.route('/changepassword').post(async (req, res) => {
	const { id, password, key } = req.body;
	const encrypted_password = await bcrypt.hash(password, 10);

	if(key === process.env.CH_PSS_KEY) {
		User.findById(id)
			.then(user => {
				user.password = encrypted_password;

				user.save()
					.then(( ) => {
						res.json({ success: true, message: 'Password changed successfully.'})
					})
					.catch(err => res.send({success: false, message: err.message}))
			})
	}
	else {
		res.json({ success: false, message: 'Wrong key.'});
	}
})

router.route('/is_authenticated').get(auth, (req, res) => {
	res.send({isLoggedIn: true, id: req.user.id, username: req.user.username, email: req.user.email});
});


module.exports = router;