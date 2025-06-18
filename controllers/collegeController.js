// 📁 Path: controllers/collegeController.js
const College = require('../models/College');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupCollege');
};

exports.signupCollege = async (req, res) => {
  try {
    const { name, email, password, phone, code } = req.body;

    // Optional: Check for existing email
    const existing = await College.findOne({ email });
    if (existing) {
      req.flash('error_msg', 'Email already registered.');
      return res.redirect('/college/signup');
    }

    const newCollege = new College({
      name,
      email,
      password,
      phone,
      code
    });

    await newCollege.save();
    req.flash('success_msg', 'College registered successfully!');
    res.redirect('/college/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Signup failed. Please try again.');
    res.redirect('/college/signup');
  }
};

exports.getLoginPage = (req, res) => {
  res.render('pages/loginCollege');
};

exports.loginCollege = async (req, res) => {
  try {
    const { email, password } = req.body;
    const college = await College.findOne({ email });

    if (!college || college.password !== password) {
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/college/login');
    }

    req.session.college = college;
    req.flash('success_msg', 'Login successful!');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Login failed. Please try again.');
    res.redirect('/college/login');
  }
};
