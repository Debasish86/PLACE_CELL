const Student = require('../models/Student');

exports.getSignupPage = (req, res) => {
  res.render('pages/signupStudent');
};

exports.signupStudent = async (req, res) => {
  try {
    const { name, email, password, phone, regd_no, semester } = req.body;
    const college_id = req.body.college_id || null;

    // Check if student already exists
    const existing = await Student.findOne({ email });
    if (existing) {
      req.flash('error', 'Email already registered');
      return res.redirect('/signup');
    }

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
    req.flash('success', 'Signup successful! Please login.');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Signup failed');
    res.redirect('/signup');
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
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    // Save student info to session
    req.session.student = {
      id: student._id,
      name: student.name,
      email: student.email
    };

    req.flash('success', `Welcome, ${student.name}!`);
    res.redirect('/'); // home page
  } catch (error) {
    console.error(error);
    req.flash('error', 'Login failed');
    res.redirect('/login');
  }
};

// Optional: Logout controller
exports.logoutStudent = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect('/login');
  });
};
