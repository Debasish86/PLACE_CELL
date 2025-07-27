const Student = require('../models/Student');
const bcrypt = require('bcrypt');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupStudent');
};

exports.signupStudent = async (req, res) => {
  const { name, email, password, phone, regd_no, semester, college_id } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing) {
      req.flash('error_msg', 'Email already registered');
      return res.redirect('/signup/student');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      regd_no,
      semester,
      college_id: college_id || null
    });

    await newStudent.save();
    req.flash('success_msg', 'Signup successful! Please login.');
    res.redirect('/login/student');
  } catch (error) {
    console.error('Signup Error:', error.message);
    req.flash('error_msg', 'Signup failed. ' + error.message);
    res.redirect('/signup/student');
  }
};

exports.getLoginPage = (req, res) => {
  res.render('pages/loginStudent');
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      req.flash('error_msg', 'No account found with this email.');
      return res.redirect('/login/student');
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      req.flash('error_msg', 'Incorrect password.');
      return res.redirect('/login/student');
    }

    req.session.studentId = student._id;
    req.session.student = student;

    req.flash('success_msg', 'Login successful!');
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login Error:', error.message);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/login/student');
  }
};

exports.logoutStudent = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout Error:", err.message);
    }
    res.redirect('/');
  });
};
