const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireTitle: check('title')
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage('Must be between 2 and 40 characters'),
  requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage('Must be a positive value'),
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }
  }),
  requirePassword: check('password')
    .trim()
    .isLength({ min:4 })
    .withMessage('Must be at least 4 characters long'),
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({ min:4 })
    .withMessage('Must be at least 4 characters long')
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Error: Passwords must match');
      } else { return true; }
    }),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });
      if (!user) {
        throw new Error('Email not found!');
      }
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user)	{
        throw new Error('Invalid password');
      }
      const validPassword = await usersRepo.comparePasswords(user.password, password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }
    })
};