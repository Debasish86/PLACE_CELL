// 📁 Path: controllers/studentController.js
const Student = require('../models/Student');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupStudent');
};

exports.signupStudent = async (req, res) => {
  try {
    const { name, email, password, phone, regd_no, semester } = req.body;
    const college_id = req.body.college_id || null;
    const newStudent = new Student({
      name,
      email,
      password,
      phone,
      regd_no,
      semester,
      college_id
    });
    await newStudent.save();
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Signup failed');
  }
};

exports.getLoginPage = (req, res) => {
  res.render('pages/loginStudent');
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    
    if (!student || student.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    req.session.student = student;
    res.redirect('/'); // Redirect to home page after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
};
