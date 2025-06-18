// 📁 Path: routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// GET signup page
router.get('/signup/company', companyController.getSignupPage);

// POST signup form
router.post('/signup/company', companyController.signupCompany);

// GET login page
router.get('/login/company', companyController.getLoginPage);

// POST login form
router.post('/login/company', companyController.loginCompany);

module.exports = router;
