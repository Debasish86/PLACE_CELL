// 📁 Path: controllers/companyController.js
const Company = require('../models/Company');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupCompany');
};

exports.signupCompany = async (req, res) => {
  try {
    const { name, email, password, phone, companyCode } = req.body;

    const newCompany = new Company({
      name,
      email,
      password,
      phone,
      companyCode
    });

    await newCompany.save();
    res.redirect('/home'); // Redirect to home after signup
  } catch (error) {
    console.error(error);
    res.status(500).send('Signup failed');
  }
};

exports.getLoginPage = (req, res) => {
  res.render('pages/loginCompany');
};

exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });

    if (!company || company.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    req.session.company = company;
    res.redirect('/'); // Redirect to home after login
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
};
