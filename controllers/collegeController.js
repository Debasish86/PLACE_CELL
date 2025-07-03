// 📁 controllers/collegeController.js
const College = require('../models/College');
const Company = require('../models/Company');

// --- COLLEGE ---

exports.getCollegeSignupPage = (req, res) => {
  res.render('pages/signupCollege', { student: req.session.student });
};

exports.signupCollege = async (req, res) => {
  try {
    const { name, email, password, phone, code } = req.body;

    const existing = await College.findOne({ email });
    if (existing) {
      req.flash('error_msg', 'Email already registered.');
      return res.redirect('/signup/college');
    }

    const newCollege = new College({ name, email, password, phone, code });
    await newCollege.save();

    // Automatically log them in (optional)
    req.session.college = newCollege;

    req.flash('success_msg', 'College registered successfully!');
    return res.redirect('/college'); // ✅ redirect here after signup
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Signup failed. Please try again.');
    res.redirect('/signup/college');
  }
};

exports.getCollegeLoginPage = (req, res) => {
  res.render('pages/loginCollege', { student: req.session.student });
};

exports.loginCollege = async (req, res) => {
  try {
    const { email, password } = req.body;
    const college = await College.findOne({ email });

    if (!college || college.password !== password) {
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/login/college');
    }

    req.session.college = college;
    req.flash('success_msg', 'Login successful!');
    return res.redirect('/college'); // ✅ redirect here after login
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Login failed. Please try again.');
    res.redirect('/login/college');
  }
};
