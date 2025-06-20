const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

// Match function names in collegeController.js
router.get('/signup/college', collegeController.getCollegeSignupPage);
router.post('/signup/college', collegeController.signupCollege);

router.get('/login/college', collegeController.getCollegeLoginPage);
router.post('/login/college', collegeController.loginCollege);
router.get('/college', (req, res) => {
    res.render('pages/dashboardCollege', { college: req.session.college });
  });
module.exports = router;
