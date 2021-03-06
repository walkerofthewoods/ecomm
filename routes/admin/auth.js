const express = require('express');

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
	requireEmail,
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

router.post(
	'/signup',
	[ requireEmail, requirePassword, requirePasswordConfirmation ],
	handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password } = req.body;

		// create a user in our repo
		const user = await usersRepo.create({ email, password });

		// store the id of that user in the users cookie
		req.session.userId = user.id;

		res.redirect('/admin/products');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;
	res.redirect('/');
});

router.get('/signin', (req, res) => {
	res.send(signinTemplate({}));
});

// functional signin below, commented out for live demo purposes
/* router.post('/signin', 
[requireEmailExists, requireValidPasswordForUser], 
handleErrors(signinTemplate),
async (req, res) => {
	const { email } = req.body;

	const user = await usersRepo.getOneBy({ email });

	req.session.userId = user.id;

	res.redirect('/admin/products');
}); */

router.post('/signin', (req, res) => {
	req.session.userId = '4686416f';

	res.redirect('/admin/products');
});

module.exports = router;
