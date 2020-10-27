const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators');

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
	res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });

	if (!user) {
		return res.send('Email not found');
	}

	const validPassword = await usersRepo.comparePasswords(user.password, password);
	if (!validPassword) {
		return res.send('Error: Invalid password');
	}

	req.session.userId = user.id;

	res.send('You are now signed in');
});

module.exports = router;
