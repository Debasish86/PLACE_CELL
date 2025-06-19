// 📁 controllers/collegeController.js
const College = require('../models/College');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupCollege', { student: req.session.student });
};

exports.signupCollege = async (req, res) => {
  try {
    const { name, email, password, phone, code } = req.body;

    const existing = await College.findOne({ email });
    if (existing) {
      req.flash('error_msg', 'Email already registered.');
      return res.redirect('/college/signup');
    }

    const newCollege = new College({ name, email, password, phone, code });
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
  res.render('pages/loginCollege', { student: req.session.student });
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

const Company = require('../models/Company');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupCompany', { student: req.session.student });
};

exports.signupCompany = async (req, res) => {
  try {
    const { name, email, password, phone, companyCode } = req.body;

    const existing = await Company.findOne({ email });
    if (existing) {
      req.flash('error_msg', 'Email is already registered.');
      return res.redirect('/company/signup');
    }

    const newCompany = new Company({ name, email, password, phone, companyCode });
    await newCompany.save();
    req.flash('success_msg', 'Company registered successfully. Please login.');
    res.redirect('/company/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Signup failed. Please try again.');
    res.redirect('/company/signup');
  }
};

exports.getLoginPage = (req, res) => {
  res.render('pages/loginCompany', { student: req.session.student });
};

exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });

    if (!company || company.password !== password) {
      req.flash('error_msg', 'Invalid email or password.');
      return res.redirect('/company/login');
    }

    req.session.company = company;
    req.flash('success_msg', 'Login successful.');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Login failed. Please try again.');
    res.redirect('/company/login');
  }
};