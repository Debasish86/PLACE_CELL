const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/forgot-password', authController.getForgotPasswordPage);
router.post('/forgot-password', authController.postForgotPassword);

router.get('/reset-password/:token', authController.getResetPasswordPage);
router.post('/reset-password/:token', authController.postResetPassword);

module.exports = router;
