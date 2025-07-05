const Company = require('../models/Company');
const Job = require("../models/Job");
// Render signup page
exports.getSignupPage = (req, res) => {
  res.render('pages/signupCompany');
};

// Handle signup form submission
exports.signupCompany = async (req, res) => {
  try {
    const { name, email, password, phone, companyCode } = req.body;

    const existing = await Company.findOne({ email });
    if (existing) {
      req.flash('error_msg', 'Email is already registered.');
      return res.redirect('/signup/company');
    }

    const newCompany = new Company({
      name,
      email,
      password,
      phone,
      companyCode
    });

    await newCompany.save();

    // Optionally auto-login after signup
    req.session.company = newCompany;

    req.flash('success_msg', 'Company registered successfully!');
    return res.redirect('/company'); // ✅ redirect here after signup
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Signup failed. Please try again.');
    res.redirect('/signup/company');
  }
};

// Render login page
exports.getLoginPage = (req, res) => {
  res.render('pages/loginCompany');
};

// Handle login form submission
exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });

    if (!company || company.password !== password) {
      req.flash('error_msg', 'Invalid email or password.');
      return res.redirect('/login/company');
    }

    req.session.company = company;
    req.flash('success_msg', 'Login successful!');
    return res.redirect('/company'); // ✅ redirect here after login
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Login failed. Please try again.');
    res.redirect('/login/company');
  }
};



exports.postJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      description,
      notification,
      jobId,
      lastDateToApply,
      applyLink,
      salary,
      numberOfOpenings
    } = req.body;

    const job = new Job({
      title,
      companyName,
      location,
      description,
      notification,
      jobId,
      lastDateToApply,
      applyLink,
      salary,
      numberOfOpenings
    });

    await job.save();

    req.flash('success_msg', 'Job posted successfully!');
    res.redirect("/company");
  } catch (error) {
    console.error("Error posting job:", error);
    req.flash('error_msg', 'Failed to post job. Please try again.');
    res.status(500).redirect("/company");
  }
};

