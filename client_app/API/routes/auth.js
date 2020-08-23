const express = require('express');
const {body, check} = require('express-validator/check');
const {check_spaces} = require('../utils/check_spaces');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup',[body('email').isEmail().withMessage('Email is wrong!'),
body('email').custom(check_spaces).withMessage("No spaces allowed"),
body('name').custom(check_spaces).withMessage("No spaces allowed"),
body('surname').custom(check_spaces).withMessage("No spaces allowed"),
body('login').custom(check_spaces).withMessage("No spaces allowed"),
body('password').custom(check_spaces).withMessage("No spaces allowed")],authController.signup); //basic validation
router.post('/login',authController.login);

module.exports = router;