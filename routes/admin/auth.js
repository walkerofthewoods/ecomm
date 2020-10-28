const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, 
				requirePassword, 
				requirePasswordConfirmation, 
				requireEmailExists, 
				requireValidPasswordForUser 
} = require('./validators');

const router = express.Router();

// Route Handlers
router.get('/signup', (req, res) => {
	res.send(signupTemplate({ req }));
});

router.post('/signup', [ requireEmail, requirePassword, requirePasswordConfirmation ], async (req, res) => {
	const errors = validationResult(req);

	console.log(errors);

  if (!errors.isEmpty()) {
    return res.send(signupTemplate({ req, errors }));
  }

	const { email, password, passwordConfirmation } = req.body;

	// create a user in our repo
	const user = await usersRepo.create({ email, password });

	// store the id of that user in the users cookie
	req.session.userId = user.id;

	res.send('Account created!!!');
});

router.get('/signout', (req, res) => {
	req.session = null;
	res.send('You are now logged out');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({}));
});

router.post('/signin', [
	requireEmailExists, 
	requireValidPasswordForUser 
], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.send(signinTemplate({errors}));
	}

	const { email } = req.body;

	const user = await usersRepo.getOneBy({ email });

	req.session.userId = user.id;

	res.send('You are now signed in');
});

module.exports = router;
