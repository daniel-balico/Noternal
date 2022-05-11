const router = require('express').Router();

const auth = require("./../middlewares/auth.middleware");
const verification = require("./../middlewares/verification.middleware");

// MODELS
let Note = require('./../models/note.model');

// MIDDLEWARES
router.use(auth, verification); // User must be authenticated and verified to use this route.

// CREATE
router.route('/create').post((req, res) => {
	const { title, note, color } = req.body;

	const new_note = new Note({ title, note, color,
								owner: req.user.id });

	new_note.save()
			.then(note => res.send({ message: 'Add note success.',
									 id: new_note._id, 
									 success: true}))

			.catch(err => res.status(400).send({ error: err, 
												 success: false}));
});

// READ
router.route('/read').get((req, res) => {
	Note.find({owner: req.user.id})
		.then(notes => res.send({ notes: notes,
					  			  success: true}))
		
		.catch(err => res.status(400).send({error: err,
											notes: [], 
											success: false}));
});

router.route('/read/:id').get((req, res) => {
	Note.findById(req.params.id)
		.then(note => res.send({ note: note, 
								 success: true}))

		.catch(err => res.status(400).send({ error: err, 
											 success: false}));
});

// UPDATE
router.route('/update/:id').put((req, res) => {
	Note.findById((req.params.id))
	.then(note => {
		note.title = req.body.title;
		note.note = req.body.note;
		note.color = req.body.color;

		note.save()
			.then(() => res.send({ message: 'Note updated.', 
								   success: true}))

			.catch(err => res.status(400).send({error: err, 
											    success: false}));
		})
		.catch(err => res.status(400).send({ error: err, 
											 success: false}));
});

// DELETE
router.route('/delete/:id').delete((req, res) => {
	Note.findByIdAndDelete(req.params.id)
		.then(note => res.send({message: 'Note deleted.', 
								success: true}))

		.catch(err => res.status(400).send({error: err, 
											success: false}));
});


module.exports = router;