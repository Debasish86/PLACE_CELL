const crypto = require('crypto');
const Student = require('../models/Student');
const { sendResetEmail } = require('../public/js/sendEmail');
const bcrypt = require('bcrypt');

// GET: Forgot Password Page
exports.getForgotPasswordPage = (req, res) => {
  res.render('pages/forgotPassword');
};

// POST: Forgot Password Logic (Send Reset Link)
exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      req.flash('error_msg', 'No account found with that email.');
      return res.redirect('/forgot-password');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 15 * 60 * 1000;

    student.resetToken = token;
    student.resetTokenExpiry = expiry;
    await student.save();

    const resetLink = `http://${req.headers.host}/reset-password/${token}`;
    await sendResetEmail(student.email, resetLink);

    req.flash('success_msg', 'Reset link sent to your email if it exists.');
    res.redirect('/login/student');
  } catch (error) {
    console.error("Forgot Password Error:", error);
    req.flash('error_msg', 'Something went wrong. Try again.');
    res.redirect('/forgot-password');
  }
};

// GET: Reset Password Page
exports.getResetPasswordPage = (req, res) => {
  res.render('pages/resetPassword', { token: req.params.token });
};

// POST: Reset Password Logic
exports.postResetPassword = async (req, res) => {
  const { password } = req.body;

  try {
    const student = await Student.findOne({
      resetToken: req.params.token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!student) {
      req.flash('error_msg', 'Reset link is invalid or has expired.');
      return res.redirect('/forgot-password');
    }

    student.password = await bcrypt.hash(password, 10);
    student.resetToken = undefined;
    student.resetTokenExpiry = undefined;
    await student.save();

    req.flash('success_msg', 'Password updated successfully.');
    res.redirect('/login/student');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/forgot-password');
  }
};
