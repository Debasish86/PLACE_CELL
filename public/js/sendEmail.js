const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: `"PlaceCell Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Your PlaceCell Password',
    html: `
      <h3>Password Reset Request</h3>
      <p>Click below to reset your password. This link will expire in 15 minutes.</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};
