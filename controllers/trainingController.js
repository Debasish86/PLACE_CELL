

const Student = require('../models/Student');
  
// controllers/placementController.js
exports.getPlacementPage = (req, res) => {
    if (!req.session.student) {
      req.flash('error_msg', 'Please login to access the Placement page.');
      return res.redirect('/login'); // 👈 Redirect to login if not logged in
    }
  
    res.render('pages/placement', {
      student: req.session.student
    });
  };
  
  
  
  exports.getTrainingPage = (req, res) => {
    if (!req.session.student){
      req.flash('error_msg', 'Please login to access the training page.');
      return res.redirect('/login/student');
    }
    
    res.render('pages/training', {
      student: req.session.student
    });
  };
  
  
  