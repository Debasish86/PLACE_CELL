const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  regd_no: String,
  semester: Number,
  password: String,
  college_id: { type: mongoose.Schema.Types.ObjectId, ref: "College" },

  // Add these 👇
  resetToken: String,
  resetTokenExpiry: Date,
});


module.exports = mongoose.model("Student", studentSchema);
