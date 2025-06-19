const Student = require('../models/Student');

exports.showDashboard = async (req, res) => {
  try {
    const studentId = req.session.studentId;

    if (!studentId) {
      req.flash('error', 'You must be logged in to view the dashboard.');
      return res.redirect('/login/student');
    }

    const student = await Student.findById(studentId);

    if (!student) {
      req.flash('error', 'Student not found.');
      return res.redirect('/login/student');
    }

    // ✅ Fixed path: Removed starting slash
    res.render('pages/dashboard', {
      title: 'Dashboard',
      student
    });
  } catch (err) {
    console.error('❌ Error in showDashboard:', err.message);
    req.flash('error', 'Failed to load dashboard.');
    res.redirect('/login/student');
  }
};
