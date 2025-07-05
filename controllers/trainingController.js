const Student = require('../models/Student');
const Job = require('../models/Job');

exports.getPlacementPage = async (req, res) => {
  if (!req.session.student) {
    req.flash('error_msg', 'Please login to access the Placement page.');
    return res.redirect('/login');
  }

  try {
    const jobs = await Job.find().sort({ postedAt: -1 }).lean(); // lean() = plain JS objects
    res.render('pages/placement', {
      student: req.session.student,
      jobs
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    req.flash('error_msg', 'Failed to load job notifications.');
    res.render('pages/placement', {
      student: req.session.student,
      jobs: []
    });
  }
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
  
  
  