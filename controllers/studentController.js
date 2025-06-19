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
      return res.redirect('/signup/student');
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
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Signup failed');
    res.redirect('/signup/student');
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
      req.flash('error_msg', 'Invalid email or password');
      return res.redirect('/login/student');
    }

    req.session.studentId = student._id;
    req.session.student = student;

    // ✅ Redirect to the original requested page or default to /home
    const redirectTo = req.session.redirectTo || '/home';
    delete req.session.redirectTo;
    res.redirect(redirectTo);

  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Login failed');
    res.redirect('/login/student');
  }
};



exports.logoutStudent = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("❌ Logout Error:", err.message);
    }
    res.redirect('/'); // ✅ Redirects to homepage
  });
};
