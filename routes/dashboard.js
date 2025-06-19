const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// ✅ Auth middleware
const ensureStudent = (req, res, next) => {
  if (req.session.studentId) return next();
  req.flash('error', 'Please login first.');
  res.redirect('/login/student');
};

// ✅ Route to dashboard
router.get('/dashboard', ensureStudent, dashboardController.showDashboard);

module.exports = router;
