const express = require('express');
const {body} = require('express-validator/check');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup',body('email').isEmail().withMessage('Email is wrong!'),authController.signup); //basic validation
router.post('/login',authController.login);

module.exports = router;