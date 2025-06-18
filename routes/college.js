const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

router.get('/signup/college', collegeController.getSignupPage);
router.post('/signup/college', collegeController.signupCollege);

router.get('/login/college', collegeController.getLoginPage);
router.post('/login/college', collegeController.loginCollege);

module.exports = router;
