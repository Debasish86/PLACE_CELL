// 📁 Path: controllers/collegeController.js
const College = require('../models/College');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupCollege');
};

exports.signupCollege = async (req, res) => {
  try {
    const { name, email, password, phone, code } = req.body;
    const newCollege = new College({
      name,
      email,
      password,
      phone,
      code
    });
    await newCollege.save();
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Signup failed');
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
      return res.status(401).send('Invalid credentials');
    }

    req.session.college = college;
    res.redirect('/'); // Redirect to home page after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
};
