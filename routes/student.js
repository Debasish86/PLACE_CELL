// 📁 Path: routes/student.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student Signup & Login
router.get('/signup', studentController.getSignupPage);
router.post('/signup/student', studentController.signupStudent);
router.get('/login', studentController.getLoginPage);
router.post('/login', studentController.loginStudent);
router.post("/login/student", studentController.loginStudent);
router.get('/logout', studentController.logoutStudent);
router.get('/profile', (req, res) => {
    if (!req.session.student) {
      req.flash('error_msg', 'Please log in first.');
      return res.redirect('/login/student');
    }
  
    res.render('pages/profile', { student: req.session.student });
  });
module.exports = router;