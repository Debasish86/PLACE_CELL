const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const trainingController = require('../controllers/trainingController');

const ensureStudent = (req, res, next) => {
  if (req.session.studentId) return next();
  req.flash('error', 'Please login first.');
  res.redirect('/login/student');
};

router.get('/dashboard', ensureStudent, dashboardController.showDashboard);
router.get('/dashboardTraining', ensureStudent, trainingController.getTrainingPage);
router.get('/dashboardPlacement', ensureStudent, trainingController.getPlacementPage);

module.exports = router;